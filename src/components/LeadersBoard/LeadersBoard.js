import { useGetLeadersBoard} from "../../hooks/getLeadersBoard.hook";
const LeadersBoard = () => {
  const { requestLeadersBoard } = useGetLeadersBoard();
  const data = requestLeadersBoard('psn-eu', 'division.bro.official.console-39')
  console.log(data)
  return <div>Leaders Boards</div>;
};
export default LeadersBoard;
