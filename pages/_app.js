import '../styles/globals.scss' 

import '../styles/header.scss'
import App from 'next/app'
import {persistor,store,wrapper} from '../store/store'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head'
import Layout from '../components/Layout'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';



class MyApp extends App {

  render () {
    const { Component, pageProps} = this.props
    return (
      <>
      <Head>
      <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
           <title>Tour Tracker</title>
          </Head>
          <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SessionProvider session={pageProps.session}>
     
   <Layout>
   {/*<Loading/>*/}<Component {...pageProps} />
      </Layout>
      
      </SessionProvider>
      </PersistGate>
      </Provider>
    
          </>
    )
  }
}

export default MyApp;

