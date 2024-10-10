import avatar from '../../../assets/avatar.svg';

export default function Message({message, user = null}) {
    return (
        <div className="flex items-start mb-4 ml-8">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3">
                <img src={avatar} alt="" />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex bg-main-3 rounded-lg py-2 px-3 max-w-xs ml-0">
                    <p className="text-sm text-text-color inline">{message}</p>
                    <span className="text-xs text-text-color ml-2 mt-2 leading-tight">{'12:00'}</span>
                </div>
            </div>
        </div>
    );
}