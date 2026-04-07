import UserModel, { IUser, Role } from './user.model';

export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
};

export const getAllUsers = (): Promise<IUser[]> => UserModel.find().select('-password');

export const getUserById = (id: string): Promise<IUser | null> =>
  UserModel.findById(id).select('-password');

export const createUser = (data: CreateUserDTO): Promise<IUser> => new UserModel(data).save();

export const updateUser = async (id: string, data: Partial<CreateUserDTO>): Promise<IUser | null> => {
  const q = UserModel.findById(id);
  if (data.password) {
    q.select('+password');
  }
  const user = await q;
  if (!user) return null;
  Object.assign(user, data);
  await user.save();
  return UserModel.findById(id).select('-password');
};

export const deactivateUser = (id: string): Promise<IUser | null> =>
  UserModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).select('-password');
