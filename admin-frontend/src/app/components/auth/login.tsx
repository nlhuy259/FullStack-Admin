'use client'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
const { Title, Text } = Typography;

const Login = () => {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
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
          Welcome Back 👋
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
          Please login to your account
        </Text>

        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              size="large" 
              placeholder="Enter username"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              size="large" 
              placeholder="Enter password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <div style={styles.rowBetween}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link href="#" style={styles.link}>
                Forgot password?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Login
            </Button>
          </Form.Item>

          <Text style={{ textAlign: 'center', display: 'block' }}>
            Don’t have an account?{' '}
            <Link href="/auth/register">Register</Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

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
  rowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: '#1677ff',
    fontWeight: 500,
  },
};