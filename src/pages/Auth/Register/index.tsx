import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useStyles } from './styles';
import Input from '../../../components/Input';
import { FormProvider, useForm } from 'react-hook-form';

interface SignUpProps {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const Register = (): JSX.Element => {
  const classes = useStyles();
  const formMethods = useForm<SignUpProps>();

  return (
    <div className={classes.container}>
      <form className={classes.formContainer}>
        <div className={classes.header}>
          <Typography color='secondary' variant='h5'>
            Insira suas informações para o registro
          </Typography>
        </div>
        <FormProvider {...formMethods}>
          <Input
            variant='outlined'
            name='email'
            label='E-mail'
            required
            givenError='Insira um endereço de e-mail'
          />
          <Input variant='outlined' name='name' label='Nome' required givenError='Insira seu nome' />
          <Input
            variant='outlined'
            type='password'
            name='password'
            label='Senha'
            required
            givenError='Insira uma senha'
          />
          <Input
            variant='outlined'
            type='password'
            name='confirmPassword'
            label='Confirme a senha'
            required
            givenError='Insira a senha novamente'
          />
        </FormProvider>        <div className={classes.bottomContainer}>
          <Button className={classes.button} type='submit'>
            Cadastrar
          </Button>
          <NavLink className={classes.signIn} to='/auth/login'>
            <Typography variant='h6'>Já possuo uma conta</Typography>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
