import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../../../components/dashboard/Dashboard";
import PostsExpertDashboard from "../../../components/dashboard/expert/posts/PostsExpertDashboard";
import Layout from "../../../components/layout/Layout";
import { getExpertisePosts } from "../../../redux/actionCreators/expertisePostActions";
import { wrapper } from "../../../redux/store";
import checkStripeField from "../../../utils/checkStripeField";
const ExpertDashboardPostsPage = () => {
    return (
        <Layout title="Posts | Expert Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Expert">
                <PostsExpertDashboard />
            </Dashboard>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const session: any = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/expert/posts&returnContext=expert%20dashboard%20posts%20page`,
                    permanent: false,
                },
            };
        }

        const isOnboarded = await checkStripeField(session.user.email, "charges_enabled", undefined)

        if (!isOnboarded) {
            return {
                redirect: {
                    destination: `/dashboard/expert/home`,
                    permanent: false,
                },
            };
        }
        try {
            await store.dispatch(getExpertisePosts(req, undefined, undefined, session.user._id));
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });

export default ExpertDashboardPostsPage;
