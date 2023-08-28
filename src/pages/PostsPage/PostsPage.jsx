import PostContainer from "../../components/PostContainer/PostContainer";

export default function ProfilePage({ profile }) {
  return (
    <>
      <h1>Posts</h1>
      <PostContainer profile={profile} />
    </>
  );
}
