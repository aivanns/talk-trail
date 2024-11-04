import { Input, Button, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN, MUST_BE_PASSWORD, PASSWORD, PASSWORD_LESS_MIN, REGISTER, MUST_BE_USERNAME, USERNAME, NOT_HAVE_ACCOUNT } from "../../shared/constants/auth";
import { LoginFieldType } from "../../types/auth";
import notificationService from "../../shared/utils/notificationService";
import { login } from "../../shared/utils/authService";
import type { FormProps } from 'antd';
import UnifiedAuthForm from "./unified-auth-form";

const AuthForm = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<LoginFieldType>['onFinish'] = async (values) => {
    try {
      const { success, message } = await login(values.username, values.password);
      if (success) {
        notificationService.success('Успех', message);
        navigate('/chats');
      } else {
        notificationService.error('Ошибка', message);
      }
    } catch (error) {
      notificationService.error('Ошибка', error as string);
    }
  };
  
  const onFinishFailed: FormProps<LoginFieldType>['onFinishFailed'] = (errorInfo) => {
    notificationService.errorWithMany(errorInfo);
  };

  return (
    <UnifiedAuthForm onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item<LoginFieldType>
        label={USERNAME}
        name="username"
        rules={[
          { 
            required: true, 
            message: MUST_BE_USERNAME 
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginFieldType>
        label={PASSWORD}
        name="password"
        dependencies={['password']}
        rules={[
          { 
            required: true, 
            message: MUST_BE_PASSWORD 
          },
          {
            min: 8,
            message: PASSWORD_LESS_MIN
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24, offset: 0 }} style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" className="submit-button" style={{ width: '30%' }}>
          {LOGIN}
        </Button>
      </Form.Item>
      <p className="mt-4 text-center text-text-color">
        {NOT_HAVE_ACCOUNT} <Link to="/auth/register" className="text-main-4 underline">{REGISTER}</Link>
      </p>
    </UnifiedAuthForm>   
  )
}

export default AuthForm;