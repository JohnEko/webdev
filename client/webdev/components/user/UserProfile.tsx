
import { User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Calendar, SquaresSubtractIcon, UserRound } from 'lucide-react'
import moment from 'moment'
import { getBlogsByUserId } from '@/actions/blogs/get-blogs-by-userid'
import Tags from '../common/Tags'
import Alert from '../common/Alert'
import ListBlog from '../blog/ListBlog'
import EditProfileButton from './EditProfileButton'
import FollowButton from './FollowButton'
import { auth } from '@/auth'

export type UserWithFollows = User & {
    followers: {
        follower: Pick<User, 'id' | 'name' | 'image'> & {
            followers: {
                id: string
            }[]
        }
    }[];

    followings: {
        following: Pick<User, 'id' | 'name' | 'image'> & {
            followers: {
                id: string
            }[]
        }
    }[];

    _count: {
        followers: number
        following: number
    }
}

const UserProfile = async ({user, page, isFollowing}: {user: UserWithFollows, page: string, isFollowing: boolean}) => {

    const currentPage = parseInt(page, 10) || 1
    const session  = await auth()
    const userId = session?.user.userId

    const { success, error } = await getBlogsByUserId({
        page: currentPage, limit: 5, userId: user.id
    })



  return (
    <div className='max-w-[1200px] m-auto p-4'>
        {/* this is the top user image  and edith button*/}
        <div className='flex gap-6 justify-between'>
            <div className='flex items-start sm:items-center gap-6 flex-col sm:flex-row'>
                <Avatar className='w-20 h-20'>
                    <AvatarImage src={user?.image ? user?.image : ''} />
                    <AvatarFallback className='border-2 border-slate-500 dark:border-slate-50'>
                        <UserRound />

                    </AvatarFallback>

                </Avatar>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-xl sm:text-3xl font-bold'>{user.name}</h1>
                    {user.bio && <p>{user.bio}</p>}
                    <div className='flex items-center gap-4'>
                        <span>followers</span>
                        <span>following</span>

                    </div>
                </div>
            
            </div>
                
            <div>
                {/* if we are not the owner of the profile we hide it and show follow button */}
                {userId == user.id && <EditProfileButton user={user}/>}
                {userId != user.id && <FollowButton user={user} isFollowing={isFollowing} isList/>}
                
            </div>

        </div>

        <div className='flex gap-4 flex-col items-center justify-center p-6 border-y mt-6 flex-wrap'>
            {/* here we show the user email and id */}
            <div className='flex items-center justify-center gap-6 flex-wrap'>
                Id: <span className='bg-secondary ml-2 py-1 px-2 rounded'>{user.id}</span>

                Email: <span className='bg-secondary ml-2 py-1 px-2 rounded'>{user.email}</span>

            </div>

            <div className='flex justify-center items-center gap-2'>
                <Calendar size={18}/> Member Since {moment(user.createdAt).format('MMMM DD YYYY')}
            </div>

            <div>
                {/* creating a Tag for use */}
                {!!user.tags.length && <div className='flex items-center justify-center p-6 border-b 
                mb-6 gap-4 flex-wrap'>
                    {user.tags.map(tag => <Tags key={tag}>{tag}</Tags>)}
                
                </div>}
            </div>

            <div>
                {error && <Alert error message="Error fetching user blogs"/>}
                {success && <ListBlog blog={success.blog} hasMore={success.hasMore} currentPage={currentPage} isUserProfile={true}/>}
            </div>

        </div>

    </div>
  )
}

export default UserProfile