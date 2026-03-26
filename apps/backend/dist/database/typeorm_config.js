"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormConfig = typeormConfig;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const member_entity_1 = require("../members/member.entity");
const task_entity_1 = require("../tasks/task.entity");
function typeormConfig() {
    const dbLocation = process.env.DB_LOCATION ?? node_path_1.default.join(process.cwd(), 'data', 'team_directory.sqlite');
    node_fs_1.default.mkdirSync(node_path_1.default.dirname(dbLocation), { recursive: true });
    return {
        type: 'sqljs',
        location: dbLocation,
        autoSave: true,
        entities: [member_entity_1.MemberEntity, task_entity_1.TaskEntity],
        synchronize: true,
        logging: false,
    };
}
//# sourceMappingURL=typeorm_config.js.map