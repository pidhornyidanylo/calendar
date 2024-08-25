import { AvatarGenerator } from "random-avatar-generator";

export const getRandomAvatar = () => {
  const generator = new AvatarGenerator();
  return generator.generateRandomAvatar();
};
