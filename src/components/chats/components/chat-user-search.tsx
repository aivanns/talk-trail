import { User } from "../../../types/chat";
import ChatSearchEntity from "./chat-search-entity";

const ChatUserSearch = ({ users, clearSearch }: { users: any[], clearSearch: () => void }) => {
    return (
        <div className="max-h-[80dvh] overflow-y-auto scrollbar-hide rounded-b-md">
            {users.map((user: User) => (
                <ChatSearchEntity key={user.uuid} user={user} clearSearch={clearSearch} />
            ))}
        </div>
    )
}

export default ChatUserSearch;