import { CommunityHub } from '../components/CommunityHub';
import { CommunityChat } from '../components/CommunityChat';

export function CommunityPage() {
  return (
    <div className="pt-16">
      <CommunityHub />
      <CommunityChat />
    </div>
  );
}