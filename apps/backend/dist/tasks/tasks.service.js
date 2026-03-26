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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const member_entity_1 = require("../members/member.entity");
const task_entity_1 = require("./task.entity");
let TasksService = class TasksService {
    tasksRepo;
    membersRepo;
    constructor(tasksRepo, membersRepo) {
        this.tasksRepo = tasksRepo;
        this.membersRepo = membersRepo;
    }
    async list() {
        return this.tasksRepo.find({
            order: { createdAt: 'DESC' },
        });
    }
    async create(dto) {
        const assigneeId = dto.assigneeId ?? null;
        if (assigneeId) {
            const assignee = await this.membersRepo.findOne({ where: { id: assigneeId } });
            if (!assignee)
                throw new common_1.BadRequestException('Assignee does not exist');
        }
        const entity = this.tasksRepo.create({
            title: dto.title,
            description: dto.description ?? null,
            status: dto.status,
            assigneeId,
        });
        return this.tasksRepo.save(entity);
    }
    async update(id, dto) {
        const entity = await this.tasksRepo.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Task not found');
        if (dto.assigneeId !== undefined) {
            const assigneeId = dto.assigneeId ?? null;
            if (assigneeId) {
                const assignee = await this.membersRepo.findOne({ where: { id: assigneeId } });
                if (!assignee)
                    throw new common_1.BadRequestException('Assignee does not exist');
            }
            entity.assigneeId = assigneeId;
        }
        if (dto.title !== undefined)
            entity.title = dto.title;
        if (dto.description !== undefined)
            entity.description = dto.description ?? null;
        if (dto.status !== undefined)
            entity.status = dto.status;
        return this.tasksRepo.save(entity);
    }
    async remove(id) {
        const res = await this.tasksRepo.delete({ id });
        if (!res.affected)
            throw new common_1.NotFoundException('Task not found');
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.MemberEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map