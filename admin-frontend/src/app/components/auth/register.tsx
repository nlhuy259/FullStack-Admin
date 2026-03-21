'use client'
import type { FormProps } from 'antd';
import { Button, Form, Input, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Register = () => {
  type FieldType = {
    username?: string;
    password?: string;
    name?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card} bordered={false}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 8 }}>
          Create Account
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
          Welcome! Please fill in the form to register.
        </Text>

        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" placeholder="Enter username" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Enter password" />
          </Form.Item>

          <Form.Item<FieldType>
            label="User Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{ marginTop: 8 }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa, #e4ecf7)',
  },
  card: {
    width: 400,
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
};