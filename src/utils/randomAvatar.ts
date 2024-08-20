import { AvatarGenerator } from "random-avatar-generator";

export const getRandomAvatar = () => {
  const generator = new AvatarGenerator();
  console.log(generator.generateRandomAvatar());
  return generator.generateRandomAvatar();
};
