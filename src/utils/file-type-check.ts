export enum AllowedImageFileType {
  Png = 'image/png',
  Jpeg = 'image/jpeg',
}

export const allowedImageExtensions = ['png', 'jpeg', 'jpg'];

const getImageMimetype = (signature: string): AllowedImageFileType | null => {
  switch (signature) {
    case '89504E47':
      return AllowedImageFileType.Png;
    case 'FFD8FFDB':
    case 'FFD8FFE0':
      return AllowedImageFileType.Jpeg;
    default:
      return null;
  }
};

export const checkFileExtensionIsAllowedImage = (
  extension: string,
): boolean => {
  return allowedImageExtensions.includes(extension);
};

export const checkFileIsImage = (data: Buffer): boolean => {
  const uint = new Uint8Array(data.slice(0, 4));
  const bytes = [];
  uint.forEach((byte) => {
    bytes.push(byte.toString(16));
  });
  const hex = bytes.join('').toUpperCase();

  return !!getImageMimetype(hex);
};
