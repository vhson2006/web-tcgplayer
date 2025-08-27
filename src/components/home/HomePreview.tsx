import { Flex, Image } from "@chakra-ui/react";

export const HomePreview = (props: any) => {
  return (
    <Flex flex="1" overflow="hidden">
      <Image
        src="https://res.cloudinary.com/datasource/image/upload/v1756265936/yugioh/IMG_1920_fgrdyh.jpg"
        alt="Shanovina"
        maxH="300px"
        minW="200px"
        objectFit="cover"
        flex="1"
      />
      <Image
        display={{ base: "none", sm: "initial" }}
        src="https://res.cloudinary.com/datasource/image/upload/v1756265941/yugioh/IMG_1919_ypb9cu.jpg"
        alt="Shanovina"
        maxH="300px"
        objectFit="cover"
      />
    </Flex>
  );
};
