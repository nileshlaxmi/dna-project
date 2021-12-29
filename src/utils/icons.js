import React from 'react';
import TelusLogoWhite from '../assets/images/telus-white.svg';
import WarningIcon from '../assets/images/warning.png';
export {
	FiUser as User,
	FiUsers as UserSettings,
	FiFilter as Filter,
	FiRefreshCw as Refresh,
	FiDownload as Download,
	FiUpload as Upload,
	FiCopy as Copy,
	FiEdit as Edit,
	FiArrowUp as Up,
	FiArrowDown as Down,
	FiSlash as Deactive,
} from 'react-icons/fi';

export {
	MdTranslate as TranslateIcon,
	MdContentPaste as Paste,
	MdAddCircle as Add,
	MdDelete as Delete,
	MdRefresh as Active,
	MdNearMe as Resend,
} from 'react-icons/md';

export const LogoWhite = () => <img alt="logo" src={TelusLogoWhite} />;
export const Warning = () => (
	<img alt="warning" className="warning-icon" src={WarningIcon} />
);
