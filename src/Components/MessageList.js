
function MessageList({messages, currentMember}) { 

    function renderMessages(message) {
         const {data, id, member} = message;
         const className = member.clientData.name === currentMember.name ? "Messages-message currentMember" : "Messages-message";

         return (
            <li className={className} key={id}>
              <span
                className="avatar"
                style={{backgroundColor: member.clientData.color}}
              />
              <div className="Message-content">
                <div className="username">
                  {member.clientData.name}
                </div>
                <div className="text">{data}</div>
              </div>
            </li>
          );
    };
    
    return(
        <ul className="Messages-list">{messages.map(message => renderMessages(message))}</ul>
    );  
};

export default MessageList;