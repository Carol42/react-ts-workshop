import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Input from '../../../components/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { useStyles } from './styles';

interface FormCredentials {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const classes = useStyles();
  const formMethods = useForm<FormCredentials>();
  const { handleSubmit } = formMethods;

  const onSubmit = () => {
    console.log('SUBMIT');
  }
  return (
    <Grid container className={classes.container}>
      <Grid className={classes.left} item xs={6}>
        <Typography style={{ color: '#FFF' }} variant='h2'>
          Bem-vindo(a) ao KRUD!
        </Typography>
      </Grid>
      <Grid className={classes.right} item xs={6}>
        <form className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <Typography color='secondary' className={classes.header} variant='h5'>
            Insira suas credenciais
          </Typography>
          <FormProvider {...formMethods}>
              <Input
              variant='outlined'
              name='email'
              label='E-mail'
              required
              givenError='Insira seu endereço de e-mail'
              defaultValue=''
            />
            <Input
              variant='outlined'
              name='password'
              label='Senha'
              type='password'
              required
              givenError='Insira sua senha'
            />
          </FormProvider>
          <div className={classes.bottomContainer}>
            <Button className={classes.button} type='submit'>
              Entrar
            </Button>
            <NavLink className={classes.signUp} to='/auth/register'>
              <Typography variant='h6'>Ainda não possui conta?</Typography>
            </NavLink>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
