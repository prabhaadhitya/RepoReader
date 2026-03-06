import User from "./user.model";

export const userService = {
  
  async findByEmail(email: string) {
    return User.findOne({ email });
  },
};