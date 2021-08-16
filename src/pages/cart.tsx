import { useContext } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import { Store } from '../utils/Store';
import Layout from '../components/Layout';

const CartScreen = () => {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  // const {cartItems} = state.cart

  return (
    <Layout title={'Carrinho de Compras'}>
      <Typography component={'h1'} variant={'h1'}>
        Carrinho de Compras
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          O Carrinho está vazio.{' '}
          <NextLink href={'/'} passHref>
            Que tal começar clicando aqui?
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align={'right'}>Quantity</TableCell>
                    <TableCell align={'right'}>Price</TableCell>
                    <TableCell align={'right'}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              layout={'responsive'}
                            />
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell align={'right'}>
                        <Select value={item.quantity}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>

                      <TableCell align={'right'}>${item.price}</TableCell>

                      <TableCell align={'right'}>
                        <Button variant={'contained'} color={'secondary'}>
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant={'h2'}>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity!, 0)}{' '}
                    items) : ${' '}
                    {cartItems.reduce((a, c) => a + c.quantity! * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button variant={'contained'} color={'primary'} fullWidth>
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};
export default dynamic(() => Promise.resolve(CartScreen), {ssr: false});