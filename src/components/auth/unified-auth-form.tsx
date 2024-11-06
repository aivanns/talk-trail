import { Form, FormProps } from "antd";
import { RegistrationFieldType, LoginFieldType } from "../../types/auth";

const UnifiedAuthForm = ({onFinish, onFinishFailed, children}: {onFinish: FormProps<RegistrationFieldType | LoginFieldType>['onFinish'], onFinishFailed: FormProps<RegistrationFieldType | LoginFieldType>['onFinishFailed'], children: React.ReactNode}): JSX.Element => {
    return (
      <Form
        className='auth-form'
        name="basic"
        layout="vertical"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {children}
      </Form>   
    )
  }
  
  export default UnifiedAuthForm;