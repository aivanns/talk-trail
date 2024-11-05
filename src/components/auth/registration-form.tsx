import '../../index.css'
import type { FormProps } from 'antd';
import { Button, Form, Input} from 'antd';
import { RegistrationFieldType } from '../../types/auth';
import { CONFIRM_PASSWORD, HAVE_ACCOUNT, LOGIN, MUST_BE_PASSWORD, MUST_BE_USERNAME, PASSWORD, PASSWORD_LESS_MIN, PASSWORDS_NOT_MATCH, REGISTER, USERNAME } from '../../shared/constants/auth';
import notificationService from '../../shared/utils/services/notificationService';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../shared/utils/services/authService';
import UnifiedAuthForm from './unified-auth-form';
import { ROUTES } from '../../shared/constants/routes';
import { SUCCESS } from '../../shared/constants/notification';
import { ERROR } from '../../shared/constants/notification';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<RegistrationFieldType>['onFinish'] = async (values) => {
    
    try {
      const { success, message } = await register(values.username, values.password, values.username);
      if (success) {
        notificationService.success(SUCCESS, message);
        navigate(ROUTES.CHATS.ROOT);
      } else {
        notificationService.error(ERROR, message);
      }
    } catch (error) {
      notificationService.error(ERROR, (error as any).message as string);
    }
  };
  
  const onFinishFailed: FormProps<RegistrationFieldType>['onFinishFailed'] = (errorInfo) => {
    notificationService.errorWithMany(errorInfo);
  };

    return (
        <UnifiedAuthForm onFinish={onFinish} onFinishFailed={onFinishFailed}>
    <Form.Item<RegistrationFieldType>
      label={USERNAME}
      name="username"
      rules={[
        { 
            required: true, 
            message: MUST_BE_USERNAME 
        }, ]}
    >
      <Input />
    </Form.Item>

    <Form.Item<RegistrationFieldType>
      label={PASSWORD}
      name="password"
      dependencies={['password']}
      rules={[
        { required: true, 
          message: MUST_BE_PASSWORD 
        },
        {
            min: 8,
            message: PASSWORD_LESS_MIN
        }]}
      hasFeedback
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<RegistrationFieldType>
      label={CONFIRM_PASSWORD}
      name="confirmPassword"
      rules={[
        {   
            required: true, 
            message: MUST_BE_PASSWORD 
        },
        { 
            min: 8, 
            message: PASSWORD_LESS_MIN
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(PASSWORDS_NOT_MATCH));
            },
          }),
      ]}
      hasFeedback
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ span: 24, offset: 0 }} style={{ textAlign: 'center' }}>
      <Button type="primary" htmlType="submit" className="submit-button" style={{ width: '30%' }}>
        {REGISTER}
      </Button>
    </Form.Item>
      <p className="mt-4 text-center text-text-color">
        {HAVE_ACCOUNT} <Link to="/auth/login" className="text-main-4 underline">{LOGIN}</Link>
      </p>
    </UnifiedAuthForm>

    )
}

export default RegistrationForm
