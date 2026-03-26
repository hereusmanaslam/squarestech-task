"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_member_dto_1 = require("./dto/create_member.dto");
const update_member_dto_1 = require("./dto/update_member.dto");
const member_entity_1 = require("./member.entity");
const members_service_1 = require("./members.service");
let MembersController = class MembersController {
    membersService;
    constructor(membersService) {
        this.membersService = membersService;
    }
    list() {
        return this.membersService.list();
    }
    create(dto) {
        return this.membersService.create(dto);
    }
    update(id, dto) {
        return this.membersService.update(id, dto);
    }
    async remove(id) {
        await this.membersService.remove(id);
    }
};
exports.MembersController = MembersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: [member_entity_1.MemberEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: member_entity_1.MemberEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_member_dto_1.CreateMemberDto]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: member_entity_1.MemberEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_member_dto_1.UpdateMemberDto]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "remove", null);
exports.MembersController = MembersController = __decorate([
    (0, swagger_1.ApiTags)('members'),
    (0, common_1.Controller)('members'),
    __metadata("design:paramtypes", [members_service_1.MembersService])
], MembersController);
//# sourceMappingURL=members.controller.js.map