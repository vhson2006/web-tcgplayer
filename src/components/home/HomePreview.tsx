import { Flex, Image } from "@chakra-ui/react";
const urls = [
    'https://res.cloudinary.com/datasource/image/upload/v1756265936/yugioh/IMG_1920_fgrdyh.jpg',
    'https://res.cloudinary.com/datasource/image/upload/v1756265941/yugioh/IMG_1919_ypb9cu.jpg',
    'https://res.cloudinary.com/datasource/image/upload/v1756280802/yugioh/IMG_1914_wlu3vc.jpg',
    'https://res.cloudinary.com/datasource/image/upload/v1756280802/yugioh/IMG_1915_ecclbh.jpg',
    'https://res.cloudinary.com/datasource/image/upload/v1756280802/yugioh/IMG_1925_djbhth.jpg',
    'https://res.cloudinary.com/datasource/image/upload/v1756280802/yugioh/IMG_1922_hz3tf0.jpg',
    'https://res.cloudinary.com/datasource/image/upload/v1756280803/yugioh/IMG_1916_pmeknh.jpg',
    'https://res.cloudinary.com/datasource/image/upload/v1756280803/yugioh/IMG_1918_ynsjk5.jpg',
    'https://res.cloudinary.com/datasource/image/upload/v1756280803/yugioh/IMG_1917_o3zd07.jpg',
    'https://res.cloudinary.com/datasource/image/upload/v1756280804/yugioh/IMG_1921_mr0xhj.jpg',
  ]
export const HomePreview = (props: any) => {
  const first = Math.floor(Math.random() * urls.length);
  const second = Math.floor(Math.random() * urls.length);

  return (
    <Flex flex="1" overflow="hidden">
      <Image
        src={urls[first]}
        alt="Shanovina"
        maxH="300px"
        minW="200px"
        objectFit="cover"
        flex="1"
      />
      <Image
        display={{ base: "none", sm: "initial" }}
        src={first === second ? urls[first + 1] : urls[second]}
        alt="Shanovina"
        maxH="300px"
        objectFit="cover"
      />
    </Flex>
  );
};
