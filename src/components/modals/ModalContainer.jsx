import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScanPayModal } from './ScanPayModal';
import { SelectBankModal } from './SelectBankModal';
import { PaymentConfirmModal } from './PaymentConfirmModal';
import { PaymentSuccessModal } from './PaymentSuccessModal';
import { PaymentFailedModal } from './PaymentFailedModal';
import { AddMoneyModal } from './AddMoneyModal';
import { SendMoneyModal } from './SendMoneyModal';
import { ReceiveMoneyModal } from './ReceiveMoneyModal';
import { TransactionDetailsModal } from './TransactionDetailsModal';
import { ScamShieldModal } from './ScamShieldModal';
import { AiAssistantModal } from './AiAssistantModal';
import { SoundboxModal } from './SoundboxModal';

export const ModalContainer = () => {
  const { activeModal, setActiveModal, selectedTxn } = useApp();

  if (!activeModal) return null;

  const handleClose = () => setActiveModal(null);

  switch (activeModal) {
    case 'scanPay':
      return <ScanPayModal onClose={handleClose} />;
    case 'selectBank':
      return <SelectBankModal onClose={handleClose} />;
    case 'confirmPayment':
      return <PaymentConfirmModal onClose={handleClose} />;
    case 'paymentSuccess':
      return <PaymentSuccessModal onClose={handleClose} />;
    case 'paymentFailed':
      return <PaymentFailedModal onClose={handleClose} />;
    case 'addMoney':
      return <AddMoneyModal onClose={handleClose} />;
    case 'sendMoney':
      return <SendMoneyModal onClose={handleClose} />;
    case 'receiveMoney':
      return <ReceiveMoneyModal onClose={handleClose} />;
    case 'txnDetails':
      return <TransactionDetailsModal txn={selectedTxn} onClose={handleClose} />;
    case 'scamCheck':
      return <ScamShieldModal onClose={handleClose} />;
    case 'aiChat':
      return <AiAssistantModal onClose={handleClose} />;
    case 'soundbox':
      return <SoundboxModal onClose={handleClose} />;
    default:
      return null;
  }
};
