import { IoIosSearch } from "react-icons/io"
import { IoIosMore } from "react-icons/io"
import { formatTimeAgo, getCompanionInfo } from "../../../../shared/utils/services/chatService"
import { useEffect, useState } from "react";
import { CompanionInfo } from "../../../../types/chat";
import { useParams } from "react-router-dom";

const ChatWinHeader = () => {
    const [companionInfo, setCompanionInfo] = useState<CompanionInfo | null>(null);
    const { uuid } = useParams();

    useEffect(() => {
        if (uuid) {
            getCompanionInfo(uuid)
                .then(response => setCompanionInfo(response))
        }
    }, [uuid]);

    return (
        <div className='flex justify-between content-center h-[3.5rem] w-full bg-main-3 rounded-t-2xl'>
                <div className='ml-5'>
                    <p className="text-text-color text-md pt-2">{companionInfo?.name}</p>
                    <p className='text-[#778DA9] text-sm leading-none'>{formatTimeAgo(companionInfo?.lastTimeOnline)}</p>
                </div>
            <div className='mr-5 mt-3 flex gap-4'>
                <IoIosSearch className="text-3xl text-main-4 hover:text-text-color cursor-pointer" />
                <IoIosMore className="text-3xl text-main-4 hover:text-text-color cursor-pointer" />
            </div>
            </div>
    )
}

export default ChatWinHeader;