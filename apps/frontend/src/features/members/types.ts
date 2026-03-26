export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateMemberInput = Pick<Member, 'firstName' | 'lastName' | 'email' | 'role'>;
export type UpdateMemberInput = Partial<CreateMemberInput>;

