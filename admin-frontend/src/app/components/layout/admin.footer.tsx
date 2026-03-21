'use client'
import React from 'react'
import { Layout } from 'antd';

const AdminFooter = () => {
	const { Footer } = Layout;
  return (
	<div>
	  <Footer style={{ textAlign: 'center' }}>
         ©{new Date().toUTCString()} 
        </Footer>
	</div>
  )
}

export default AdminFooter
