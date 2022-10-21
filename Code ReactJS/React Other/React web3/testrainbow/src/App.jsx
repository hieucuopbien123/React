import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'

function App() {
  const { address, isConnected } = useAccount();
  console.log(address);
  console.log(isConnected);

  // Để gửi transaction hay gọi hàm hay ký message ta dùng hook của wagmi cung hết, nó là thư viện chuyên hook 
  // cho ethereum
  return (
    <div>
      {/* Có ConnectButton.Custom giúp custom button mới hoàn toàn style theo ý ta */}
      <ConnectButton label='Sign in'
        chainStatus="icon"
        showBalance={false}
        accountStatus="avatar"
      />
    </div>
  );
}

export default App
