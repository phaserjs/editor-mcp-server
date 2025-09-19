## Scenes and Game Objects

The Phaser Editor scenes are JSON files that define the structure and properties of game objects within a scene. Each scene contains an array of game objects, each with its own unique "id", "type", and various properties such as position, scale, rotation, and custom properties.

I will describe to you the different type of game objects that can be present in a scene, along with their properties and how they can be manipulated. You will use this information to fill the parameters of the functions like "scene-add-game-objects", "scene-update-game-objects", and others. I will use a TypeScript-like syntax to describe the types and properties of the game objects. Each game object type extends properties from component-like classes and also includes its own specific properties. The "constructor" syntax indicates the required properties for creating an instance of that game object type. These required properties are inherited, so you have to look into the constructor of all the super classes. To update an existing game object, you can provide any subset of its properties. The property names are regular TypeScript identifiers, but it also allows name.with.dots syntax. It doesn't indicate a nested object, but a property with a name that includes dots.

The enum constants are integer values. When you generate the JSON for it, use the integer value of the constant.

Here are the game object types and their properties:

```ts
// component and config classes

class VariableComponent {
    constructor(label)
    // The scope of the variable. By default, the editor may generate or not a variable ('local' scope). It depends on if it needs a variable to update the object just after the creation. However, you can force to generate a variable and assign a scope to it, so you can access the object from different parts of the code. When you set a 'public' scope, the editor generates a public field in the class. The same with the `class` scope, but the field is private (in TypeScript). The 'method' scope says to the editor to generate a local variable. The 'nested_prefab' scope is like the public scope but also indicates that the object is a nested prefab.
    scope: "LOCAL" | "PUBLIC" | "METHOD" | "CLASS" | "NESTED_PREFAB" = "LOCAL"
    // Label of the object. It is used to name the object in the scene and as the variable name in code. Use a valid JavaScript identifier. Different game objects should have different labels, just like variable names in the same block of code.
    label: string
}

class PrefabComponent {
    // The ID of a prefab scene. If provided, then an instanceof the prefab is created. The `type` property should match with the built-in type of the prefab.
    prefabId: string
    // An array of the properties to unlock in the prefab instance. If not provided, all properties are locked. This is useful to create a prefab instance that can be modified in the scene editor. A simple case is that most of the time you would like to unlock the `x` and `y` properties of thew prefab instance, so you can place it in a different position. You can use this field also to restore the default value of a property in a prefab instance. For example, if you have a prefab with a property `health` and you want to set it to the default value, then you can exclude the `health` property from the `unlock` list, and the object will get the `health` value defined in the prefab. In summary, if you are going to set a user property value, you should include its name in this `unlock` list, or exclude it if you want to restore the property's value to its default. Each prefab instance contains its own `unlock` field. If you want to change a nested prefab instance, you have to access it directly.
    unlock: string[]
    // An object with the values of the user defined properties to set in the prefab instance. If not provided, the prefab instance will be created with the default values defined in the prefab scene. Prefab properties are declared in the prefab scene. When a prefab extends another prefab it inherits all the user properties, so you have to check all the hierarchy of a prefab to know all the properties defined by the user. Also, you should look into the property type so you can make the values with the right format. User properties can be locked/unlocked, so if you are going to set a user property value, you should include its name in the `unlock` field. This is important, these are the properties of the prefab instance, not the properties of the nested prefab instances or any other children object. To change the property of nested prefab instances you have to access them directly and set the `prefabProps` in the nested prefab instance.
    prefabProps: {
        [key: string]: any
    }
}

class TransformComponent {
    x: number = 0
    y: number = 0
    scaleX: number = 1
    scaleY: number = 1
    angle: number = 0
}

class TextureConfig {
    // The key of the asset. If the texture is an atlas or sprite-sheet, you have to include the frame too.
    key: string
    // Required in the texture is an atlas or sprite-sheet frame.
    frame?: string | number
}

class TextureComponent {
    texture: TextureConfig
}

// The origin maps the relationship between the size and position of the Game Object.
// The default value is 0.5, meaning all Game Objects are positioned based on their center.
// Setting the value to 0 means the position now relates to the left of the Game Object.
class OriginComponent {
    originX: number = 0.5
    originY: number = 0.5
}

class FlipComponent {
    flipX: boolean = false
    flipY: boolean = false
}

class VisibleComponent {
    visible: boolean = true
}

class AlphaComponent {
    alpha: number = 1
    alphaTopLeft: number = 1
    alphaTopRight: number = 1
    alphaBottomLeft: number = 1
    alphaBottomRight: number = 1
}

class AlphaSingleComponent {
    alpha: number = 1
}

enum BlendModes {
    SKIP_CHECK,
    NORMAL,
    ADD,
    MULTIPLY,
    SCREEN,
    OVERLAY,
    DARKEN,
    LIGHTEN,
    COLOR_DODGE,
    COLOR_BURN,
    HARD_LIGHT,
    SOFT_LIGHT,
    DIFFERENCE,
    EXCLUSION,
    HUE,
    SATURATION,
    COLOR,
    LUMINOSITY,
    ERASE,
    SOURCE_IN,
    SOURCE_OUT,
    SOURCE_ATOP,
    DESTINATION_OVER,
    DESTINATION_IN,
    DESTINATION_OUT,
    DESTINATION_ATOP,
    LIGHTER,
    COPY,
    XOR,
}

class BlendModeComponent {
    blendMode: BlendModes = BlendModes.NORMAL
}

// Tint color fields are in hexadecimal format, e.g., "#ff0000" for red.
// This value is interpolated from the corner to the center of the game object.
class TintComponent {
    // Tint fill. false = An additive tint (the default), where vertices colors are blended with the texture. true = A fill tint, where the vertices colors replace the texture, but respects texture alpha. It is not required to set the corner tints.
    tintFill: boolean = false
    tintTopLeft: string = "#ffffff"
    tintTopRight: string = "#ffffff"
    tintBottomLeft: string = "#ffffff"
    tintBottomRight: string = "#ffffff"
}

class SizeComponent {
    width: number = 0
    height: number = 0
}

// The way a hitArea is positioned within a game object depends on the area shape. Circles and ellipses are shapes with a center, so this center is usually placed at the center of the game object. To calculate the center of the game object, you can use its size. If the game object is 100x100 in size, and the hit area is a circle, then you could use a circle with radius 50 at position 50, 50. On the other hand, for a rectangle or polygon area, you wouldn't need to adjust its position, since they don't have a center and their top/left corner is aligned with the top/left corner of the game object.
class HitAreaComponent {
    hitArea: {
        shape: "NONE" | "RECTANGLE" | "CIRCLE" | "ELLIPSE" | "POLYGON" | "PIXEL_PERFECT" = "NONE"
        // Used by the rectangle, ellipse, and circle shapes.
        x: number = 0
        // Used by the rectangle, ellipse, and circle shapes.
        y: number = 0
        // Used by the rectangle and ellipse shapes.
        width: number = 0
        // See width.
        height: number = 0
        // Used by the circle shape.
        radius: number = 0
        // The points of the polygon hit area. It should be a sequence of numbers, where each pair of numbers represents a point (x, y) in the polygon. For example, 'x1 y1 x2 y2 x3 y3' for a triangle. The points should be in clockwise order.
        points: string
        // The alpha tolerance value, between 0 and 255. Used by the pixel perfect shape.
        alphaTolerance: number = 1
    }
}

class ParentComponent {
    // If true, the prefab instance allows to append children game objects to it. If false, the prefab instance doesn't allow to append children game objects to it. In that case, the user cannot add children game objects to the prefab instance in the scene editor. This field is only valid for prefab instances. You always can add children to a parent game object that is not a prefab instance.
    allowAppendChildren: boolean = false
}

class ArcadeComponent {
    // Whether the arcade component is active or not. When the Arcade component is active it means the game object has a Phaser Arcade Physics body. To enable a physics body, use the scene-enable-arcade-physics-body tool. To disable a physics body, use the scene-disable-arcade-physics-body tool. This property is readonly and cannot be set directly.
    readonly ArcadeComponent.active: boolean = false
    
    // The type of physics body to create for the Arcade Physics component. DYNAMIC_BODY (0) is a body that can move and be affected by forces, STATIC_BODY (1) is a body that does not move and is not affected by forces.
    body.physicsType: number = 0
    
    // The geometry of the physics body to create for the Arcade Physics component. CIRCLE (0) is a circular body, RECTANGLE (1) is a rectangular body.
    body.geometry: number = 1
    
    // If this Body is circular, this is the unscaled radius of the Body, as set by setCircle(), in source pixels. The true radius is equal to `halfWidth`.
    body.radius: number = 0
    
    // The width of the physics body if the bodyGeometry is RECTANGLE. This is ignored if the bodyGeometry is CIRCLE.
    body.width: number = 0
    
    // The height of the physics body if the bodyGeometry is RECTANGLE. This is ignored if the bodyGeometry is CIRCLE.
    body.height: number = 0
    
    // The offset of this Body's position from its Game Object's position, in source pixels.
    body.offset.x: number = 0
    body.offset.y: number = 0

    // The Body's velocity, in pixels per second.
    body.velocity.x: number = 0
    body.velocity.y: number = 0
    
    // The absolute maximum velocity of this body, in pixels per second. The horizontal and vertical components are applied separately.
    body.maxVelocity.x: number = 10000
    body.maxVelocity.y: number = 10000
    
    // The Body's change in velocity, in pixels per second squared.
    body.acceleration.x: number = 0
    body.acceleration.y: number = 0
    
    // When `useDamping` is false (the default), this is absolute loss of velocity due to movement, in pixels per second squared. When `useDamping` is true, this is a damping multiplier between 0 and 1. Drag is applied only when `acceleration` is zero.
    body.drag.x: number = 0
    body.drag.y: number = 0
    
    // Rebound following a collision, relative to 1.
    body.bounce.x: number = 0
    body.bounce.y: number = 0
    
    // Acceleration due to gravity (specific to this Body), in pixels per second squared. Total gravity is the sum of this vector and the simulation's `gravity`.
    body.gravity.x: number = 0
    body.gravity.y: number = 0
    
    // Whether this Body's position is affected by gravity (local or world).
    body.allowGravity: boolean = true
    
    // Whether this Body can be moved by collisions with another Body.
    body.immovable: boolean = false
    
    // The Body's inertia, relative to a default unit (1). With `bounce`, this affects the exchange of momentum (velocities) during collisions.
    body.mass: number = 1
    
    // Whether this Body interacts with the world boundary.
    body.collideWorldBounds: boolean = false
    
    // The rate of change of this Body's `rotation`, in degrees per second.
    body.angularVelocity: number = 0
    
    // The Body's angular acceleration (change in angular velocity), in degrees per second squared.
    body.angularAcceleration: number = 0
    
    // Loss of angular velocity due to angular movement, in degrees per second. Angular drag is applied only when angular acceleration is zero.
    body.angularDrag: number = 0
    
    // The Body's maximum angular velocity, in degrees per second.
    body.maxAngular: number = 1000
    
    // Whether this Body is updated by the physics simulation.
    body.enable: boolean = true
    
    // Whether the Body's position and rotation are affected by its velocity, acceleration, drag, and gravity.
    body.moves: boolean = true
    
    // The maximum speed this Body is allowed to reach, in pixels per second. If not negative it limits the scalar value of speed. Any negative value means no maximum is being applied (the default).
    body.maxSpeed: number = -1
    
    // If this Body is `immovable` and in motion, `friction` is the proportion of this Body's motion received by the riding Body on each axis, relative to 1.
    body.friction.x: number = 1
    body.friction.y: number = 0
    
    // If this Body is using `drag` for deceleration this property controls how the drag is applied. If set to `true` drag will use a damping effect rather than a linear approach.
    body.useDamping: boolean = false
    
    // Whether this Body's velocity is affected by its `drag`.
    body.allowDrag: boolean = true
    
    // Whether the simulation emits a `worldbounds` event when this Body collides with the world boundary (and `collideWorldBounds` is also true).
    body.onWorldBounds: boolean = false
    
    // Collision check settings
    body.checkCollision.none: boolean = false
    body.checkCollision.up: boolean = true
    body.checkCollision.down: boolean = true
    body.checkCollision.left: boolean = true
    body.checkCollision.right: boolean = true
    
    // Whether this Body's `rotation` is affected by its angular acceleration and angular velocity.
    body.allowRotation: boolean = true
    
    // Sets if this Body can be pushed by another Body. A body that cannot be pushed will reflect back all of the velocity it is given to the colliding body.
    body.pushable: boolean = true
    
    // Overlap amounts (before separation), if this Body is colliding with another.
    body.overlapX: number = 0
    body.overlapY: number = 0
    body.overlapR: number = 0
}

// game object classes

abstract class GameObject extends
    VariableComponent,
    PrefabComponent,
    HitAreaComponent,
    ArcadeComponent {
    constructor(label)
}

class Image extends GameObject,
    TransformComponent,
    OriginComponent,
    FlipComponent,
    VisibleComponent,
    AlphaComponent,
    BlendModeComponent,
    TintComponent,
    TextureComponent {
    constructor(label, x, y, texture)
}

class Sprite extends Image {
    constructor(label, x, y, texture)
    // The key of the animation to play.
    animationKey: string
    // The method to play the animation. 0 - none, 1 - play, 2 - play reverse.
    animationPlayMethod: number
    // If true, the animation will be previewed in realtime in the scene editor.
    animationPreview: boolean = false
}

class TileSprite extends Image, SizeComponent {
    constructor(label, x, y, width, height, texture)
    tilePositionX: number = 0
    tilePositionY: number = 0
    tileScaleX: number = 1
    tileScaleY: number = 1
}

class NineSlice extends
    GameObject,
    TransformComponent,
    OriginComponent,
    FlipComponent,
    VisibleComponent,
    AlphaSingleComponent,
    BlendModeComponent,
    SingleTintComponent,
    TextureComponent,
    SizeComponent {

    constructor(label, x, y, width, height, texture)
    leftWidth: number = 0
    rightWidth: number = 0
    topHeight: number = 0
    bottomHeight: number = 0
}

class ThreeSlice extends
    GameObject,
    TransformComponent,
    OriginComponent,
    FlipComponent,
    VisibleComponent,
    AlphaSingleComponent,
    BlendModeComponent,
    SingleTintComponent,
    TextureComponent,
    SizeComponent{

    constructor(label, x, y, width, height, texture)
    leftWidth: number = 0
    rightWidth: number = 0
}

// When adding a Text object, the `originX` and `originY` properties are set to 0 by default, so the origin is at the top-left corner. You can change these values to set a different origin.
class Text extends
    GameObject,
    TransformComponent,
    OriginComponent,
    FlipComponent,
    VisibleComponent,
    AlphaComponent,
    BlendModeComponent,
    TintComponent {

    constructor(label, x, y, text)
    // The Text object has the origin at the top-left corner by default. Take this in consideration when you position the text.
    originX: number = 0
    originY: number = 0
    text: string
    fontFamily: string
    fontSize: string
    align: "left" | "center" | "right" | "justify"
    fontStyle: " " | "bold" | "italic" | "bold italic"
    stroke: string
    strokeThickness: number
    color: string
    backgroundColor: string
    shadow: {
        offsetX: number = 0
        offsetY: number = 0
        color: string = "#000"
        stroke: boolean = false
        fill: boolean = false
        blur: number = false
    }
}

class Layer extends
    GameObject,
    ParentComponent,
    BlendModeComponent,
    VisibleComponent,
    AlphaSingleComponent {
    constructor(label)
    // the default blendMode for the Layer is SKIP_CHECK
    blendMode: BlendModes = BlendModes.SKIP_CHECK
}

class Container extends
    GameObject,
    ParentComponent,
    TransformComponent,
    VisibleComponent,
    AlphaSingleComponent,
    BlendModeComponent {
    constructor(label)
    // the default blendMode for the Container is SKIP_CHECK
    blendMode: BlendModes = BlendModes.SKIP_CHECK
}

class BitmapText extends GameObject,
    TransformComponent,
    OriginComponent,
    VisibleComponent,
    AlphaComponent,
    BlendModeComponent,
    TintComponent {

    constructor(label, x, y, font, fontSize, text)
    text: string
    // Bitmap Font asset key.
    font: string
    // 0 left, 1 center, 2 right
    align: number = 0
    fontSize: number
    letterSpacing: number
    maxWidth: number
    dropShadowX: number
    dropShadowY: number
    dropShadowAlpha: number
    // shadow color in hex format (e.g., "#ff0000" for red)
    dropShadowColor: string
}

abstract class Shape extends
    GameObject,
    TransformComponent,
    OriginComponent,
    VisibleComponent,
    AlphaSingleComponent,
    BlendModeComponent {
    constructor(label)

    // in hex format, e.g., "#ff0000" for red
    fillColor: string
    isFilled: boolean = true
    fillAlpha: number = 1
    isStroked: boolean = false
    // in hex format, e.g., "#ff0000" for red
    strokeColor: string
    strokeAlpha: number = 1
    lineWidth: number = 1
}

class Rectangle extends Shape, SizeComponent {
    constructor(label)
}

class Ellipse extends Shape, SizeComponent {
    constructor(label)
    smoothness: number = 64
}

class Triangle extends Shape {
    constructor(label)
    x1: number = 0
    y1: number = 128
    x2: number = 64
    y2: number = 0
    x3: number = 128
    y3: number = 128
}

class Polygon extends Shape {
    constructor(label)
    // The points of the polygon. Use a string with the format `x1 y1 x2 y2 x3 y3 ...`
    points: string
}

class SpineGameObject extends GameObject,
    TransformComponent,
    VisibleComponent,
    BlendModeComponent {

    constructor(label, x, y, dataKey, atlasKey, skinName, bpType, bpSkin, bpAnimation)
    // The key of the spine data (skeleton) asset
    dataKey: string
    // The key of the spine atlas asset.
    atlasKey: string
    // The name of the skin to use. A skeleton may have multiple skins.
    skinName: string
    enablePreview: boolean = false
    // You can find the animation names in the skeleton data.
    previewAnimation: string
    // The start time of the animation to preview. You can use it to advance the animation to a specific time.
    previewTime: number = 0
    // The boundsProviderType. 0 = SETUP_TYPE, 1 = SKINS_AND_ANIMATION_TYPE. The most common is to use the SKINS_AND_ANIMATION_TYPE. It can use the same skin and animation used by the preview.
    bpType: number
    // If the bounds provider uses all the skins or only the current skin. ALL_SKINS = 0, CURRENT_SKIN = 1
    bpSkin: number
    // The name of the animation to use for the bounds provider. If not set, no animation is used.
    bpAnimation: string
    // The time step to use for the bounds provider.
    bpTimeStep: number = 0.05
}

class TilemapLayer extends
    GameObject,
    TransformComponent,
    VisibleComponent {

    constructor(label, tilemapId, layerName, tilesets)

    // The `id` of the Tiled tilemap this layer belongs to. There are two type of tilemaps: Tiled tilemaps and EditableTilemaps. This is the `id` of the Tiled tilemap.
    tilemapId: string
    // The name of the layer in the Tiled tilemap.
    layerName: string
    // The name of the tilesets used by this layer. These should match the names defined in the tilemap's tilesets.
    tilesets: string[]
}

class EditableTilemapLayer extends
    GameObject,
    TransformComponent,
    VisibleComponent,
    BlendModeComponent {
    constructor(label)
}

// EmitterOp classes for particle emitters
type EaseType = "Power0" | "Power1" | "Power2" | "Power3" | "Power4" | "Linear" | "Quad" | "Cubic" | "Quart" | "Quint" | "Sine" | "Expo" | "Circ" | "Elastic" | "Back" | "Bounce" | "Stepped" | "Quad.easeIn" | "Cubic.easeIn" | "Quart.easeIn" | "Quint.easeIn" | "Sine.easeIn" | "Expo.easeIn" | "Circ.easeIn" | "Elastic.easeIn" | "Back.easeIn" | "Bounce.easeIn" | "Quad.easeOut" | "Cubic.easeOut" | "Quart.easeOut" | "Quint.easeOut" | "Sine.easeOut" | "Expo.easeOut" | "Circ.easeOut" | "Elastic.easeOut" | "Back.easeOut" | "Bounce.easeOut" | "Quad.easeInOut" | "Cubic.easeInOut" | "Quart.easeInOut" | "Quint.easeInOut" | "Sine.easeInOut" | "Expo.easeInOut" | "Circ.easeInOut" | "Elastic.easeInOut" | "Back.easeInOut" | "Bounce.easeInOut"

class EmitterOp_None {
    type = "None"
}

class EmitterOp_Static {
    type = "Static"
    // Static value
    value: number = 0
}

class EmitterOp_Random {
    type = "Random"
    // Random value
    random: number[]
}

class EmitterOp_StartEndRandom {
    type = "StartEndRandom"
    start: number
    end: number
    // If true, the value will be random between start and end.
    randomFlag: boolean = false
    // Easing function to use for the value.
    ease: EaseType
}

class EmitterOp_Interpolation {
    type = "Interpolation"
    // An array of values which will be used for interpolation during the particles lifetime
    values: number[]
    // The interpolation function to be used.
    interpolation: "linear" | "catmull" | "bezier" = "linear"
    // The ease function used to control the rate of change through the values.
    ease: EaseType
}

class EmitterOp_Stepped {
    type = "Stepped"
    // The steps parameter allows you to control the placement of sequential particles across the start-end range.
    steps: number = 1
    // The start of the range.
    start: number = 0
    // The end of the range.
    end: number = 1
    // As with the stepped emitter, particles are emitted in sequence, from 'start' to 'end' in step sized jumps. Normally, when a stepped emitter reaches the end it snaps around to the start value again. However, if you provide the 'yoyo' parameter then when it reaches the end it will reverse direction and start emitting back down to 'start' again. Depending on the effect you require this can often look better.
    yoyo: boolean = false
}

class EmitterOp_MinMax {
    type = "MinMax"
    // The minimum value of the range. A random value is selected between 'min' and 'max'.
    min: number = 0
    // The maximum value of the range. A random value is selected between 'min' and 'max'.
    max: number = 0
    // Whether to use integer values.
    int: boolean = false
}

type EmitterOp_onEmitAndUpdate = EmitterOp_None | EmitterOp_Static | EmitterOp_Random | EmitterOp_StartEndRandom | EmitterOp_Interpolation | EmitterOp_Stepped | EmitterOp_MinMax

type EmitterOp_onEmitOnly = EmitterOp_None | EmitterOp_Static | EmitterOp_Random | EmitterOp_Stepped | EmitterOp_MinMax

class ParticleEmitter extends
    GameObject,
    TransformComponent,
    OriginComponent,
    VisibleComponent,
    AlphaSingleComponent,
    BlendModeComponent {

    constructor(label)

    // The configuration object for the Particle Emitter. This contains all the properties that can be set on the emitter.
    config: {
        // Transform properties

        // The x coordinate the particles are emitted from. This is relative to the Emitters x coordinate and that of any parent.
        x: EmitterOp_onEmitAndUpdate
        // The y coordinate the particles are emitted from. This is relative to the Emitters y coordinate and that of any parent.
        y: EmitterOp_onEmitAndUpdate
        // The x coordinate emitted particles move toward.
        moveToX: EmitterOp_onEmitAndUpdate
        // The y coordinate emitted particles move toward.
        moveToY: EmitterOp_onEmitAndUpdate
        // Sets the vertical and horizontal scale of the emitted particles. This is relative to the Emitters scale and that of any parent.
        scale: EmitterOp_onEmitAndUpdate
        // The horizontal scale of emitted particles. This is relative to the Emitters scale and that of any parent.
        scaleX: EmitterOp_onEmitAndUpdate
        // The vertical scale of emitted particles. This is relative to the Emitters scale and that of any parent.
        scaleY: EmitterOp_onEmitAndUpdate
        // The angle at which the particles are emitted. The values are given in degrees.
        angle: EmitterOp_onEmitOnly
        // The rotation (or angle) of each particle when it is emitted. The value is given in degrees.
        rotate: EmitterOp_onEmitAndUpdate

        // Timing properties

        // The number of milliseconds to wait after emission before the particles start updating.
        delay: EmitterOp_onEmitOnly
        // The number of milliseconds to wait after a particle has finished its life before it will be removed.
        hold: EmitterOp_onEmitOnly
        // The lifespan of the emitted particles. This value is given in milliseconds and defaults to 1000ms.
        lifespan: EmitterOp_onEmitOnly
        // The number of particles emitted per second.
        quantity: EmitterOp_onEmitOnly
        // Limit the emitter to emit particles for a maximum of duration ms. Default to zero, meaning 'forever'.
        _duration: number
        // Limit the emitter to emit this exact number of particles and then stop. Default to zero, meaning no limit.
        _stopAfter: number
        // For a flow emitter, the time interval between particle flow cycles in ms.
        _frequency: number
        // The time rate applied to active particles, affecting lifespan, movement, and tweens.
        _timeScale: number
        // The maximum number of alive and rendering particles this emitter will update.
        _maxAliveParticles: number
        // Set to hard limit the amount of particle objects this emitter is allowed to create in total.
        _maxParticles: number
        // If you wish to 'fast forward' the emitter in time, set this value to a number representing the amount of ms.
        _advance: number

        // Physics properties

        // The horizontal acceleration applied to emitted particles, in pixels per second squared.
        accelerationX: EmitterOp_onEmitAndUpdate
        // The vertical acceleration applied to emitted particles, in pixels per second squared.
        accelerationY: EmitterOp_onEmitAndUpdate
        // The maximum horizontal velocity emitted particles can reach, in pixels per second squared.
        maxVelocityX: EmitterOp_onEmitAndUpdate
        // The maximum vertical velocity emitted particles can reach, in pixels per second squared.
        maxVelocityY: EmitterOp_onEmitAndUpdate
        // The initial speed of emitted particles, in pixels per second.
        speed: EmitterOp_onEmitOnly
        // The initial horizontal speed of emitted particles, in pixels per second.
        speedX: EmitterOp_onEmitOnly
        // The initial vertical speed of emitted particles, in pixels per second.
        speedY: EmitterOp_onEmitOnly
        // Horizontal acceleration applied to emitted particles, in pixels per second squared.
        gravityX: number
        // Vertical acceleration applied to emitted particles, in pixels per second squared.
        gravityY: number
        // A radial emitter will emit particles in all directions between angle min and max.
        radial: boolean

        // Color properties

        // A color tint value that is applied to the texture of the emitted particle.
        tint: EmitterOp_onEmitAndUpdate
        // The alpha value of the emitted particles. This is a value between 0 and 1.
        alpha: EmitterOp_onEmitAndUpdate
        // A color tint value applied to particles. Should be Random type for color interpolation.
        color: EmitterOp_None | EmitterOp_Random
        // Controls the easing function used when interpolating particle colors over their lifetime.
        colorEase: EaseType
        // The tint fill mode used by the Particles in this Emitter.
        tintFill: boolean
        // The blend mode applied to the emitted particles.
        blendMode: BlendModes

        // Sorting properties

        // Newly emitted particles are added to the top of the particle list.
        particleBringToTop: boolean
        // When sortProperty is defined this controls the sorting order, either ascending or descending.
        sortOrderAsc: boolean
        // Optionally sort the particles before they render based on this property.
        sortProperty: string

        // Preview properties
        // The amount of time, in milliseconds, to advance the preview by.
        previewAdvance: number
        // Set to true to preview the emitter in the editor.
        previewActive: boolean

        // Animation properties

        // An array of animation keys that are used to animate the particles.
        _anim: string[]
        // Whether animations will be assigned consecutively (true) or at random (false).
        _animCycle: boolean
        // The number of consecutive particles receiving each animation, when cycle is true.
        _animQuantity: number

        // Texture properties
        
        // The texture key of the emitter.
        configTexture: string
        // The frame name of the texture, in case the texture is part of an atlas or sprite sheet. If the texture is a simple image, leave this field empty.
        configFrame: (string | number)[]
    }
}

// Filter classes

abstract class Filter extends
    VariableComponent {
    constructor(label)

    // The padding to apply to the left side of the filter. This is useful for filters that need extra space on the left side. Often it uses negative values to create a space for the filter effect.
    paddingLeft: number = 0
    // The padding to apply to the right side of the filter. This is useful for filters that need extra space on the right side.
    paddingRight: number = 0
    // The padding to apply to the top side of the filter. This is useful for filters that need extra space on the top side. Often it uses negative values to create a space for the filter effect.
    paddingTop: number = 0
    // The padding to apply to the bottom side of the filter. This is useful for filters that need extra space on the bottom side.
    paddingBottom: number = 0
}

class Glow extends Filter {
    constructor(label)
    // The color of the glow effect. This value should be set as a hex number, i.e. 0xff0000 for red, or 0xff00ff for purple.
    color: string = "#ffffff"
    // The strength of the glow inward from the edge of the Sprite.
    outerStrength: number = 4
    // The strength of the inner glow effect.
    innerStrength: number = 0
    // The scale of the glow effect. This multiplies the fixed distance.
    scale: number = 1
    // If `true` only the glow is drawn, not the texture itself.
    knockout: boolean = false
    // The quality of the glow effect. This cannot be changed after the filter has been created.
    quality: number = 10
    // The distance of the glow effect. This cannot be changed after the filter has been created.
    distance: number = 10
}

class Shadow extends Filter {
    constructor(label)
    // The horizontal offset of the shadow effect.
    x: number = 0
    // The vertical offset of the shadow effect.
    y: number = 0
    // The amount of decay for the shadow effect
    decay: number = 0.1
    // The power of the shadow effect.
    power: number = 1
    // The color of the shadow.
    color: string = "#000000"
    // The number of samples that the shadow effect will run for. This should be an integer with a minimum value of 1 and a maximum of 12.
    samples: number = 6
    // The intensity of the shadow effect.
    intensity: number = 1
}

class Pixelate extends Filter {
    constructor(label)
    // The amount of pixelation to apply. The size of the pixels is equal to 2 + the amount.
    amount: number = 1
}

class Blur extends Filter {
    constructor(label)
    // The horizontal offset of the blur effect.
    x: number = 2
    // The vertical offset of the blur effect.
    y: number = 2
    // The strength of the blur effect.
    strength: number = 1
    // The color of the blur as a hex string.
    color: string = "#ffffff"
    // The number of steps to run the Blur effect for. This value should always be an integer. The higher the value, the smoother the blur, but at the cost of exponentially more gl operations. Keep this to the lowest possible number you can have it, while still looking correct for your game.
    steps: number = 4
}

class Barrel extends Filter {
    constructor(label)
    // The amount of distortion applied to the barrel effect. Typically keep this within the range 1 (no distortion) to +- 1.
    amount: number = 1
}

class Displacement extends Filter {
    constructor(label)
    // The amount of horizontal displacement to apply. The maximum horizontal displacement in pixels is `x` multiplied by 0.5 times the width of the camera rendering the filter.
    x: number = 0.005
    // The amount of vertical displacement to apply. The maximum vertical displacement in pixels is `y` multiplied by 0.5 times the height of the camera rendering the filter.
    y: number = 0.005
    // The texture to be used for the displacement effect. You can only use a whole texture, not a frame from a texture atlas or sprite sheet.
    texture: TextureConfig
}

class Bokeh extends Filter {
    constructor(label)
    // The radius of the bokeh effect. This is a float value, where a radius of 0 will result in no effect being applied, and a radius of 1 will result in a strong bokeh. However, you can exceed this value for even stronger effects.
    radius: number = 0.5
    // The amount, or strength, of the bokeh effect.
    amount: number = 1
    // The color contrast, or brightness, of the bokeh effect.
    contrast: number = 0.2
    // Is this a Tilt Shift effect or a standard bokeh effect?
    isTiltShift: boolean = false
    // If a Tilt Shift effect this controls the amount of horizontal blur. Setting this value on a non-Tilt Shift effect will have no effect.
    blurX: number = 1
    // If a Tilt Shift effect this controls the amount of vertical blur. Setting this value on a non-Tilt Shift effect will have no effect.
    blurY: number = 1
    // If a Tilt Shift effect this controls the strength of the blur. Setting this value on a non-Tilt Shift effect will have no effect.
    strength: number = 1
}

class Blend extends Filter {
    constructor(label)
    // The blend mode of the game object. It defines how the game object is blended with the background. The default value is `NORMAL`.
    blendMode: BlendModes = BlendModes.NORMAL
    // The amount of the blend effect to apply to the view. At 0, the original image is preserved. At 1, the blend texture is fully applied.
    amount: number = 1
    // The color of the blend effect. The default value is #ffffff, which means no color change.
    color: string = "#ffffff"
    // The texture to be used for the blend effect. You can only use a whole texture, not a frame from a texture atlas or sprite sheet.
    texture: TextureConfig
}

class ObjectMask extends Filter {
    constructor(label)
    // Whether to invert the mask. An inverted mask switches what it hides and what it shows.
    invert: boolean = false
    // The `id` of the game object to use as a mask for the filter.
    maskObjectId: string
}

class TextureMask extends Filter {
    constructor(label)
    // Whether to invert the mask. An inverted mask switches what it hides and what it shows.
    invert: boolean = false
    // The texture to be used for the mask effect.
    texture: TextureConfig
}

class Threshold extends Filter {
    constructor(label)
    // The first edge of the threshold. This contains the lowest value for each channel.
    edge1: number[] = [0.5, 0.5, 0.5, 0.5]
    // The second edge of the threshold. This contains the highest value for each channel. If it is the same as the first edge, the threshold is a single value.
    edge2: number[] = [0.5, 0.5, 0.5, 0.5]
    // Whether each channel is inverted.
    invert: number[] = [0, 0, 0, 0]
}

class ColorMatrix extends Filter {
    constructor(label)
    // The type of operation to perform.
    operationType: ColorMatrixOperationType = ColorMatrixOperationType.NOP
    // The value that determines how much of the original color is used when mixing the colors. A value between 0 (all original) and 1 (all final). Used when the `operationType` is not `NOP`.
    alpha: number = 1
    // The matrix preset. Used when the `operationType` is `SET_MATRIX`.
    matrixPreset: ColorMatrixPreset
    // The amount of brightness to apply to this ColorMatrix. Between 0 (black) and 1. Used when the `operationType` is `SET_BRIGHTNESS`.
    brightness: number = 0
    // The amount of saturation to apply to this ColorMatrix. Used when the `operationType` is `SET_SATURATE`.
    saturate: number = 0
    // The amount of hue rotation to apply to this ColorMatrix, in degrees. Used when the `operationType` is `SET_HUE`.
    hueRotation: number = 0
    // The grayscale scale (0 is black). Used when the `operationType` is `SET_GRAYSCALE`.
    grayscale: number = 1
    // The amount of contrast to apply to this ColorMatrix. Used when the `operationType` is `SET_CONTRAST`.
    contrast: number = 0
    // The intensity of this effect. Used when the `operationType` is `SET_NIGHT`.
    nightIntensity: number = 0.1
}

// plain objects

// Plain objects are simpler objects. You can not make prefabs or nested prefabs with them.
class PlainObject extends VariableComponent {
    constructor(label)
}

class Collider extends PlainObject {
    constructor(label)

    // A valid javascript expression that returns the objects that are part of the collider. A collider tests `object1` against `object2`. It is very common that the expression points to the variable of a game object, like in `player`, a Layer's list (`myLayer.list`), a Container list (`myContainer.list`), or a game object list that groups other objects in the scene. Colliders are created at the end of the scene so you can reference the variable names of the game objects. If you use the expression `this.myObject`, then should declare `myObject` with a scope such as CLASS, PUBLIC, or NESTED_PREFAB. When you will set the object in a collider, you should ask your self: do the objects have the right scope?
    object1: string
    // A valid javascript expression that returns the objects that are part of the collider. Look the `object1` property for more information.
    object2: string
    // The second object in the collision. Look for `object1` for more information.
    overlapOnly: boolean = false
    // A valid javascript expression that returns a function to be called when the collider detects a collision. The function will receive the two objects that are colliding as arguments. The function can return `true` to allow the collision to happen, or `false` to prevent it.
    processCallback: string
    // A valid javascript expression that returns a function to be called when the collider detects a collision. The function will receive the two objects that are colliding as arguments.
    collideCallback: string
    // A valid javascript expression that returns the context in which the `processCallback` and `collideCallback` functions will be called. This is useful if you want to use `this` inside the callback functions to access properties or methods of a class or object. Most of the time you will use `this` to access the scene, like in `this` or `this.scene` in a context of a prefab.
    callbackContext: string
}

class TilesetConfig {
    // The name of the tileset, as it appears in the map data.
    name: string
    // The key of an asset image or spritesheet to associate with the tileset.
    imageKey: string
}

class Tilemap extends PlainObject {
    constructor(label, key, tilesets)
    // The key of the tilemap.
    key: string
    // The tilesets used by the tilemap.
    tilesets: TilesetConfig[]
}