'use client';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostList from '../notice-list';
import PostDetailsHero from '../notice-details-hero';
import { PostDetailsSkeleton } from '../notice-skeleton';

// ----------------------------------------------------------------------

type Props = {
  /* title: string; */
  contents: any;
};

export default function PostDetailsHomeView({ contents }: Props) {
  const { post, postError, postLoading } = contents

  const renderSkeleton = <PostDetailsSkeleton />;

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${postError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={'/post'}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost = post && (
    <>
      <PostDetailsHero
        title={post.pageTitle}
        author={post.author}
        coverUrl={post.coverUrl}
        createdAt={post.createdAt}
      />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'Home',
              href: '/',
            },
            {
              name: 'Notice',
              href: '/post',
            },
            {
              name: post?.title,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="subtitle1" sx={{ mb: 5 }}>
            {post.description}
          </Typography>

          <Markdown children={post.content} />

          <Stack
            spacing={3}
            sx={{
              py: 3,
              borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
              borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {post.tags.map((tag: any) => (
                <Chip key={tag} label={tag} variant="soft" />
              ))}
            </Stack>

            <Stack direction="row" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    size="small"
                    color="error"
                    icon={<Iconify icon="solar:heart-bold" />}
                    checkedIcon={<Iconify icon="solar:heart-bold" />}
                  />
                }
                label={fShortenNumber(post.totalFavorites)}
                sx={{ mr: 1 }}
              />

              {/* <AvatarGroup>
                {post.favoritePerson.map((person) => (
                  <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
                ))}
              </AvatarGroup> */}
            </Stack>
          </Stack>

          {/* <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
            <Typography variant="h4">Comments</Typography>

            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
              ({post.comments.length})
            </Typography>
          </Stack> */}

        </Stack>
      </Container>
    </>
  );

  /*   const renderLatestPosts = (
      <>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Recent Posts
        </Typography>
  
        <PostList
          posts={latestPosts.slice(latestPosts.length - 4)}
          loading={latestPostsLoading}
          disabledIndex
        />
      </>
    ); */

  return (
    <>
      {postLoading && renderSkeleton}

      {postError && renderError}

      {post && renderPost}

      {/* <Container sx={{ pb: 15 }}>{!!latestPosts.length && renderLatestPosts}</Container> */}
    </>
  );
}
