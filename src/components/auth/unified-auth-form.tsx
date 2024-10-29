import { Form, FormProps } from "antd";

const UnifiedAuthForm = ({onFinish, onFinishFailed, children}: {onFinish: FormProps<any>['onFinish'], onFinishFailed: FormProps<any>['onFinishFailed'], children: React.ReactNode}): JSX.Element => {
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