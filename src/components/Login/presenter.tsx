import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import styles from './index.module.scss';
import { Login } from '@/types/form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Login>;
  onSubmit: SubmitHandler<Login>;
  register: UseFormRegister<Login>;
  errors: FieldErrors<Login>;
};

export function Presenter(props: Props) {
  return (
    <>
      <form className={styles.loginForm} onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className={styles.formWrapper}>
          <div>fast pass 1</div>
          <div className={styles.error}>
            {props.errors.email && <span>※Email is required</span>}
            {props.errors.password && <span>※Password is required</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              placeholder='email'
              {...props.register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            <input placeholder='password' {...props.register('password', { required: true })} />
          </div>
          <button className={styles.submitBtn} type='submit'>
            Login
          </button>
        </div>
      </form>
    </>
  );
}
