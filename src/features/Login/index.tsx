import { useForm, SubmitHandler } from 'react-hook-form';
import { Presenter } from '~/features/Login/presenter';
import { useLogin } from '~/features/Login/useLogin';
import { Login } from '~/types/form';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const { login } = useLogin();
  const onSubmit: SubmitHandler<Login> = async (data) => login(data);

  return (
    <>
      <Presenter
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
    </>
  );
}
