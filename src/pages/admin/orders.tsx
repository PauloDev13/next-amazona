// imports externos
import React, { useContext, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import axios from 'axios';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
// imports locais
import { Store } from '../../utils/Store';
import useStyles from '../../utils/styles';
import { getError } from '../../utils/error';
import Layout from '../../components/Layout';

interface ActionProps {
  type: string;
  payload?: any;
}

interface StateProps {
  loading: boolean;
  orders: ISummaryOrder[];
  error: string;
}

interface ISummaryOrder {
  _id: string;
  user: { name: string };
  createdAt: string;
  totalPrice: number;
  paidAt: string;
  isPaid: string;
  deliveredAt: string;
  isDelivered: string;
}

function reducer(state: StateProps, action: ActionProps): StateProps {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: '',
      };
    }
    case 'FETCH_FAIL': {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}

const AdminOrder = () => {
  const {state} = useContext(Store);
  const router: any = useRouter();
  const [{loading, orders, error}, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  const {userInfo} = state;
  const classes = useStyles();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }

    const fetchData = async () => {
      try {
        dispatch({type: 'FETCH_REQUEST'});
        const {data} = await axios.get(`/api/admin/orders`, {
          headers: {
            authorization: `Bearer ${userInfo?.token}`,
          },
        });

        dispatch({type: 'FETCH_SUCCESS', payload: data});
      } catch (err) {
        dispatch({type: 'FETCH_FAIL', payload: getError(err)});
      }
    };
    fetchData();
  }, []); //[userInfo, router]);

  return (
    <Layout title={'Histórico de Pedidos'}>
      <Grid container spacing={1}>
        <Grid item md={2} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href={'/admin/dashboard'}>
                <ListItem button component={'a'}>
                  <ListItemText primary={'Admin Dashboard'}/>
                </ListItem>
              </NextLink>

              <NextLink href={'/admin/orders'} passHref>
                <ListItem selected button component={'a'}>
                  <ListItemText primary={'Pedidos'}/>
                </ListItem>
              </NextLink>

              <NextLink href={'/admin/products'} passHref>
                <ListItem button component={'a'}>
                  <ListItemText primary={'Produtos'}/>
                </ListItem>
              </NextLink>

              <NextLink href={'/admin/users'} passHref>
                <ListItem button component={'a'}>
                  <ListItemText primary={'Usuários'}/>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>

        <Grid item md={10} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component={'h1'} variant={'h1'}>
                  Pedidos
                </Typography>
              </ListItem>
              <ListItem>
                {loading ? (
                  <CircularProgress/>
                ) : error ? (
                  <Typography className={classes.error}>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>USUÁRIO</TableCell>
                          <TableCell>DATA</TableCell>
                          <TableCell align={'right'}>TOTAL</TableCell>
                          <TableCell>PAGAMENTO</TableCell>
                          <TableCell>ENVIO</TableCell>
                          <TableCell align={'center'}>AÇÃO</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id.substring(20, 24)}</TableCell>
                            <TableCell>
                              {order.user
                                ? order.user.name
                                : 'Usuário excluído'}
                            </TableCell>
                            <TableCell>{order.createdAt}</TableCell>
                            <TableCell align={'right'}>
                              R$ {order.totalPrice}
                            </TableCell>
                            <TableCell>
                              {order.isPaid
                                ? `pago em ${order.paidAt}`
                                : 'em aberto'}
                            </TableCell>
                            <TableCell>
                              {order.isDelivered
                                ? `enviado em ${order.deliveredAt}`
                                : 'não enviado'}
                            </TableCell>
                            <TableCell align={'center'}>
                              <NextLink href={`/order/${order._id}`} passHref>
                                <Button size={'small'} variant={'contained'}>
                                  Detalhes
                                </Button>
                              </NextLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default dynamic(() => Promise.resolve(AdminOrder), {ssr: false});