import PostThread from '@/components/forms/PostThread';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { fetchUser, fetchUsers } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { profileTabs } from '@/constants';
import ThreadsTab from '@/components/shared/ThreadsTab';
import UserCard from '@/components/cards/UserCard';
import { fetchCommunities } from '@/lib/actions/community.action';
import CommunityCard from '@/components/cards/CommunityCard';


const page = async () => {
    const user = await currentUser();
    if(!user) return null;
    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

    //fetch communities
    const result = await fetchCommunities({
        searchString: "",
        pageNumber: 1,
        pageSize: 25,
    })

  return (
    <section>
        <h1 className="head-text mb-10">Search</h1>

        {/* search bar */}

        <div className='mt-14 flex flex-col gap-9'>
            {result.communities.length === 0 ? (
                <p className='no-result'>No communities</p>
            ): (
                <>
                {result.communities.map((Community) => (
                    <CommunityCard 
                        key={Community.id}
                        id={Community.id}
                        name={Community.name}
                        username={Community.username}
                        imgUrl={Community.image}
                        bio={Community.bio}
                        members={Community.members}
                    />
                ))}
                </>
            )}
        </div>
    </section>
  )
}

export default page