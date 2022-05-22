declare module '*.png';
declare module '*.svg';
declare module '*.webp';
declare module '*.gif';
declare module '@walletconnect/web3-provider/dist/umd/index.min.js' {
    import WalletConnectProvider from '@walletconnect/web3-provider/dist/esm/index';
    export default WalletConnectProvider
  }