import z from "zod";
import { SceneId } from "./common.js";
import { IToolsManager } from "../IToolsManager.js";


const USER_PROPERTY_IDS = [
    "number", "string", "boolean", "color", "keycode", "expression", "option", "objectVar", "object-ref", "constructor", "event", "texture-config", "animation-key", "audio-key", "asset-key", "scene-key", "spine-skin-name", "spine-animation-name", "spine-event"] as const;

const USER_PROPERTY_DESCRIPTIONS = `

- "number": A numeric property. The value is a number.

- "string": A text property. The value is a string.

- "boolean": A true/false property. The value is a boolean.

- "color": A color property. The value is a string representing a color in hexadecimal format, e g. "#ff0000" for red.

- "keycode": A Phaser keyboard key code property. The value is a string representing a keyboard key, e g. "SPACE", "A", "ENTER". All the values in the \`Phaser.Input.Keyboard.KeyCodes\` enum.

- "expression": Any javascript valid expression. The value is a string representing the expression, e g. "this.player.x", "Math.random() * 500".

- "option": A property that can be one of a set of predefined string options. The value is a string representing one of the options. When the the type is "option", the property definition must include the list of all the available options, in the "options" field. Look the "options" field for more details.

- "objectVar": A reference to a variable that is an object. The value is a string representing a valid JavaScript expression that points to an object in the scene. Like in \`this.player.leftHand\`. This type is kind of deprecated, use "object-ref" instead.

- "object-ref": A reference to another game object in the scene. The value is the 'id' of the game object.

- "constructor": A JavaScript expression that is a class. It could be a Phaser game object class or a prefab class. Like in "Phaser.GameObjects.Image" or "PlayerPrefab".

- "event": A reference to a Phaser event or custom user event. The value is a string representing the event name, e g. "pointerdown", "update", "my-user-event".

- "texture-config": A string that is an string-encoded texture configuration that is a JSON object with the 'key' and 'frame' of the texture, Like in '{"key":"bubbles","frame":"blue"}'. The 'frame' is optional if the texture is an image, like in '{"key":"background"}'. It is important, very important that you encode the JSON object as a string, so the value is a string. Don't forget to properly escape the string. The editor will decode it to an object when reading the property value.

- "animation-key": A string the key of a sprite animation. You can look for the available animations in the project with the \`assets-get-available-animations\` tool.

- "audio-key": A string that is the key of an audio asset.

- "asset-key": A string that is the key of an asset in the project. You can look for the available assets in the project with the \`assets-get-available-asset-packs\` tool.

- "scene-key": A string that is the key of a scene in the project. The scene key is the name of the scene file without the extension.

- "spine-skin-name": A string that is the name of a skin of a Spine skeleton.

- "spine-animation-name": A string that is the name of an animation of a Spine skeleton.

- "spine-event": A string that is the name of a Spine event.
`;


function UserPropertyDefinitionComponent() {

    return {
        name: z.string().describe("The name of the user property. The editor compiles a prefab user property as a field of the prefab class. This name is used as variable name for that field."),
        label: z.string().describe("The display name of the property. It is used in the editor to show the property name in the user interface."),
        tooltip: z.string().describe("A very short description."),
        customDefinition: z.boolean().default(false).describe("By default, a user property is generated in code as a field. If you set this property to true, then the editor skips the generation of the field definition in code, so the user can write a custom property declaration. Most of the time the user doesn't need to do this."),
        type: z.object({
            id: z.enum(USER_PROPERTY_IDS).describe(`The id type of the user property. Following the list of all the available types and a description of the format of their values: ${USER_PROPERTY_DESCRIPTIONS}`),
            isArray: z.boolean().default(false).describe("If true, the property is an array of the given type. If false, the property is a single value of the given type. If the property is an array, "),
            options: z.array(z.string()).optional().describe("If the type is 'option', this is the list of all the available options. The value (and defValue) of the property must be one of these options. If the type is not 'option', this property is ignored."),
        }),
        defValue: z.any().describe("A user property is always initialized with a default value. It could never be null or undefined. Its raw type is string, number, or boolean, but the format/syntax of the value depends on the type of the property. If the property is an array, then this property refers to the default element of the array when the user adds a new element. To set the default array, use the `defArrayValue` property. If the type is `option`, then the default value should be one of the provided options. Look the `type` property for more details."),
        defArrayValue: z.array(z.unknown()).optional().describe("If the property is an array, this is the default array. If the property is not an array, this value is ignored. The type of each element of the array must follow the same rules as the `defValue` property. Look the `defValue` property for more details."),
    };
}

export function PrefabSceneId() {

    return {
        sceneId: z.string().describe("The `id` of the prefab scene. The `id` is not the name of the scene, else a unique identifier is set in the scene data. You need to read the scene data to get the `id`. This id refers only to the scenes that are prefabs.",)
    };
}

export function definePrefabTools(manager: IToolsManager) {

    manager.defineTool("ide-create-new-prefab-scene", "Create a new special scene that is a prefab. A prefab is a scene with a single game object (the prefab object) and its children. You can create a prefab instance and add it to a scene or another prefab. That's the idea of prefabs, create reusable objects. It is very common to create a prefab for every entity of the game, like the player, the different enemies, non-player characters, platforms, collectibles and many more. A prefab scene is compiled as a subclass of a game object, not as a Phaser.Scene. You can think about a prefab as a custom game object class. Even, you can create a prefab that is variant of another prefab. This means, a prefab that inherits another prefab. To create a prefab variant, just use another prefab instance as root of the prefab scene, as prefab object. This tool only creates an empty prefab scene, you must add the prefab object to the scene, immediately. The goal of a prefab is to instantiate and add it to other scenes.", {
        name: z.string().describe("The name of the prefab scene file. It is not a full name, just the name. The extension will be added automatically."),
    });

    manager.defineTool("ide-get-all-prefabs-in-project", "Get all prefabs in the project.", {});

    manager.defineTool("ide-get-prefab-inheritance", "Get an array of all the prefabs that are part of the inheritance of the given prefab. A prefab can inherit another prefab. We call it a prefab variant. If the result is an empty array it means the given prefab is not a variant any other prefab.", {
        prefabId: z.string().describe("The ID of the prefab scene to get the inheritance from. The `prefabId` is the same of the id of referring prefab scene."),
    });

    manager.defineTool("scene-declare-prefab-property", "Create a new user property for the given prefab.", {
        ...PrefabSceneId(),
        ...UserPropertyDefinitionComponent(),
    });

    manager.defineTool("scene-delete-prefab-property", "Delete a user property from the given prefab.", {
        ...PrefabSceneId(),
        name: z.string().describe("The name of the user property to delete."),
    });

    manager.defineTool("scene-get-nested-prefabs-instances", "Get all the nested prefab instances of the given prefab instance. A prefab instance can have other prefab instances as children that are exposed as nested prefab instances. This tool returns all the nested prefab instances, not the direct children. You can use this tool to get the info of the nested prefab instances and perform operations like updating the nested prefabs or, in case they are containers-like objects, add objects to them. You cannot delete a nested prefab instance. A nested prefab instance also have a `prefabId` that points to an object inside the root prefab. You can modify a nested prefab instance just like any other prefab instance, you have to provide the id, the values of the properties, and update the `unlock` field. Each nested prefab instance contains its own data.", {
        ...SceneId(),
        id: z.string().describe("The `id` of the prefab instance game object in the scene."),
    });
}
