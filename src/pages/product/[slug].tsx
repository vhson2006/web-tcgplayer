import { Box, Container, Flex, Heading, SimpleGrid, Stack, Text, StackDivider, useColorModeValue, VStack, Button, HStack, FormControl, FormLabel } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "store/wrapper";
import useTranslation from "next-translate/useTranslation";
import { renderPublicComponent } from "commons/layouts/render-component";
import { actions } from "components/product/slice";
import { actions as commonActions } from 'commons/consts/slice';
import { initialFetch } from "store/helper";
import { PriceTag } from "components/product/popups/PriceTag";
import { Gallery } from "components/product/components/Gallery";
import { QuantityPicker } from "modules/inputs/QuantityPicker";
import notify from "utils/notify";
import { ErrorMessage } from "commons/messages/ErrorMessage";
import { usePath } from "utils/link";
import parse from "html-react-parser";
import { PageHeader } from "commons/layouts/headers";
import { actions as cartActions } from 'components/product/cart-slice';
import ProductBreadcrumb from "commons/layouts/breadcrumb";

const ProductDetail = (props: any) => {
  const { isServer } = props;
  const [ quantity, setQuantity ] = useState<any>(1);
  const { detail, isError } = useSelector(({ product }: any) => product);
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { fullPath } = usePath();

  useEffect(() => {
    if (!isServer) {
      initialFetch(dispatch, [actions.GET_DETAIL_BY_SLUG_ASYNC(slug)])
    }
  }, []);

  useEffect(() => {
    if (!isServer) {
      dispatch(actions.GET_DETAIL_BY_SLUG_ASYNC(slug))
    }
  }, [fullPath]);

  const addItemToCart = () => {
    const { id, name, description, price, storage, image } = detail;
    dispatch(cartActions.ADD_ITEM({
      id, 
      name,
      description: storage.description,
      price: price,
      image: [
        {
          url: image,
          alt: name
        }
      ],
      quantity
    }))
    notify.success(t('message#product#add'));
  };

  if (isError) return <ErrorMessage message={t('error#common')} />;
  
  return renderPublicComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>
      <Container flex="1">
        <ProductBreadcrumb/>
        <Box maxW="6xl" mx="auto" my="0">
          <PageHeader title={t("product#detail#title")} description="" />
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 6, md: 12 }}
          >
            {// take care have bug here
              detail?.productImages &&
              <Gallery rootProps={{ overflow: 'hidden', flex: '1' }} images={[{alt: detail.name, url: detail?.image}]}/>
            }
            <Stack spacing={{ base: 6, md: 10 }}>
              <HStack spacing={{ base: 4, sm: 6 }} >
                <Text w={'25%'}>{t('product#detail#name')}</Text>
                <Text>
                  {detail?.name}
                </Text>
              </HStack>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <HStack spacing={{ base: 4, sm: 6 }}>
                  <Text w={'25%'}>{t('product#detail#price')}</Text>
                  <PriceTag
                    currency="VND"
                    price={detail.price}
                    priceProps={{ color: useColorModeValue("gray.800", "gray.200") }}
                    // salePrice={detail.promotionPrice}
                    salePriceProps={{
                      color: useColorModeValue("red.500", "red.400"),
                      fontWeight: "bold",
                    }}
                  />
                </HStack>
                <HStack spacing={{ base: 4, sm: 6 }}>
                  <Text w={'25%'}>{t('product#detail#quantity')}</Text>
                  <Box w={'50%'}>
                    <QuantityPicker max={10} value={quantity} onChange={setQuantity}/>
                  </Box>
                </HStack>
              </Stack>
              <Button onClick={addItemToCart} variant="primary">
                {t("button#add")}
              </Button>
            </Stack>
          </SimpleGrid>
          <Stack pb={{ base: 6, md: 12 }}>
            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={"2xl"}
              fontWeight={"300"}
            >
              {parse(detail.storage?.description?.replace(/\n/g, "<br />") || '')}
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params, query, locale }: any) => {
      const isServer = !req.url.startsWith("/_next");
      const { slug } = params;
      if (isServer) {
        store.dispatch(commonActions.FETCH_NEWS_CATEGORY());
        store.dispatch(commonActions.FETCH_PRODUCT_CATEGORY());
        store.dispatch(actions.GET_DETAIL_BY_SLUG_ASYNC(slug))
        store.dispatch(END);
        await store.sagaTask.toPromise();
      }

      return {
        props: {
          isServer,
        },
      };
    }
);

export default ProductDetail;
