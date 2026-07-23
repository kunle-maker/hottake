import React, { useState, useEffect } from 'react';
import { User, Post, Fixture, Transfer, Community, NotificationItem, AgedLikeVote, HotMeterLevel, CommunityVerdict } from './types';
import { CURRENT_USER, INITIAL_POSTS, INITIAL_FIXTURES, INITIAL_TRANSFERS, COMMUNITIES, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { HomeFeed } from './components/HomeFeed';
import { SearchExploreView } from './components/SearchExploreView';
import { FixturesView } from './components/FixturesView';
import { TransfersView } from './components/TransfersView';
import { CommunitiesView } from './components/CommunitiesView';
import { ProfileView } from './components/ProfileView';
import { CreatePostModal } from './components/CreatePostModal';
import { AuthModal } from './components/AuthModal';
import { CommentsModal } from './components/CommentsModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AdminPanelModal } from './components/AdminPanelModal';

export default function App() {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('hottakes_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('hottakes_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [fixtures, setFixtures] = useState<Fixture[]>(INITIAL_FIXTURES);
  const [transfers, setTransfers] = useState<Transfer[]>(INITIAL_TRANSFERS);
  const [communities] = useState<Community[]>(COMMUNITIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [drafts, setDrafts] = useState<string[]>(['Arsenal mid structure is severely underrated when Merino drops deep...']);

  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab | 'profile'>('home');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

  // Modals
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);

  // Persist local state
  useEffect(() => {
    localStorage.setItem('hottakes_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hottakes_posts', JSON.stringify(posts));
  }, [posts]);

  // Actions
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = p.isLikedByMe;
        return {
          ...p,
          isLikedByMe: !isLiked,
          likesCount: isLiked ? p.likesCount - 1 : p.likesCount + 1
        };
      }
      return p;
    }));
  };

  const handleVoteAged = (postId: string, vote: AgedLikeVote) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        if (p.myAgedVote === vote) return p; // already voted same
        const wasWine = p.myAgedVote === 'FINE_WINE';
        const wasMilk = p.myAgedVote === 'MILK';

        let wineCount = p.agedLikeWineVotes;
        let milkCount = p.agedLikeMilkVotes;

        if (wasWine) wineCount -= 1;
        if (wasMilk) milkCount -= 1;

        if (vote === 'FINE_WINE') wineCount += 1;
        if (vote === 'MILK') milkCount += 1;

        return {
          ...p,
          myAgedVote: vote,
          agedLikeWineVotes: wineCount,
          agedLikeMilkVotes: milkCount
        };
      }
      return p;
    }));
  };

  const handleBookmarkPost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, isBookmarkedByMe: !p.isBookmarkedByMe };
      }
      return p;
    }));
  };

  const handleRepost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isReposted = p.isRepostedByMe;
        return {
          ...p,
          isRepostedByMe: !isReposted,
          repostsCount: isReposted ? p.repostsCount - 1 : p.repostsCount + 1
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, commentsCount: p.commentsCount + 1 };
      }
      return p;
    }));
  };

  const handleCreatePostSubmit = (data: {
    content: string;
    images?: string[];
    hashtags: string[];
    taggedClub?: string;
    taggedPlayer?: string;
    hotMeter: HotMeterLevel;
    communityVerdict: CommunityVerdict;
  }) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      userId: user.id,
      author: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        isVerified: user.isVerified,
        level: user.level,
        favoriteClubCrest: user.favoriteClubCrest
      },
      content: data.content,
      images: data.images,
      hashtags: data.hashtags,
      taggedClub: data.taggedClub,
      taggedPlayer: data.taggedPlayer,
      createdAt: 'Just now',
      hotMeter: data.hotMeter,
      communityVerdict: data.communityVerdict,
      agedLikeWineVotes: 1,
      agedLikeMilkVotes: 0,
      likesCount: 1,
      isLikedByMe: true,
      commentsCount: 0,
      repostsCount: 0
    };

    setPosts([newPost, ...posts]);

    // Award XP to user for posting a hot take!
    setUser(prev => ({
      ...prev,
      xp: prev.xp + 50,
      totalPosts: prev.totalPosts + 1
    }));
  };

  const handleAwardXp = (amount: number) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const handleLikeTransfer = (id: string) => {
    setTransfers(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, likesCount: t.likesCount + 1 };
      }
      return t;
    }));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const userPosts = posts.filter(p => p.userId === user.id || p.author.username === user.username);
  const bookmarkedPosts = posts.filter(p => p.isBookmarkedByMe);

  return (
    <div className="min-h-screen bg-[#F4F7FA] dark:bg-[#07152B] text-slate-900 dark:text-white font-sans antialiased selection:bg-[#00A3E0] selection:text-white">
      {/* Top Header */}
      <Header
        user={user}
        unreadCount={unreadNotificationsCount}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        onOpenSearch={() => setActiveTab('search')}
        onOpenProfile={() => setActiveTab('profile')}
        onOpenAdmin={() => setShowAdminModal(true)}
        onOpenAuth={() => setShowAuthModal(true)}
        isLoggedIn={isLoggedIn}
      />

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-3 sm:px-4 pt-4">
        {activeTab === 'home' && (
          <HomeFeed
            posts={posts}
            user={user}
            onLike={handleLikePost}
            onVoteAged={handleVoteAged}
            onOpenComments={(p) => setActiveCommentsPost(p)}
            onBookmark={handleBookmarkPost}
            onRepost={handleRepost}
            onOpenCreatePost={() => setShowCreatePostModal(true)}
            onSelectCommunity={(id) => {
              setSelectedCommunityId(id);
              setActiveTab('communities');
            }}
          />
        )}

        {activeTab === 'search' && (
          <SearchExploreView
            posts={posts}
            communities={communities}
            onOpenPost={(p) => setActiveCommentsPost(p)}
            onSelectCommunity={(id) => {
              setSelectedCommunityId(id);
              setActiveTab('communities');
            }}
          />
        )}

        {activeTab === 'fixtures' && (
          <FixturesView
            fixtures={fixtures}
            userXp={user.xp}
            onAwardXp={handleAwardXp}
          />
        )}

        {activeTab === 'transfers' && (
          <TransfersView
            transfers={transfers}
            onLikeTransfer={handleLikeTransfer}
          />
        )}

        {activeTab === 'communities' && (
          <CommunitiesView
            communities={communities}
            posts={posts}
            selectedCommunityId={selectedCommunityId}
            onSelectCommunity={(id) => setSelectedCommunityId(id)}
            onLikePost={handleLikePost}
            onOpenComments={(p) => setActiveCommentsPost(p)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={user}
            userPosts={userPosts}
            bookmarkedPosts={bookmarkedPosts}
            drafts={drafts}
            onLikePost={handleLikePost}
            onVoteAged={handleVoteAged}
            onOpenComments={(p) => setActiveCommentsPost(p)}
            onLogout={() => {
              setIsLoggedIn(false);
              setShowAuthModal(true);
            }}
            onOpenAdmin={() => setShowAdminModal(true)}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab === 'profile' ? 'home' : activeTab}
        onSelectTab={(tab) => {
          setSelectedCommunityId(null);
          setActiveTab(tab);
        }}
        onOpenCreatePost={() => setShowCreatePostModal(true)}
      />

      {/* Modals */}
      {showCreatePostModal && (
        <CreatePostModal
          user={user}
          onClose={() => setShowCreatePostModal(false)}
          onSubmit={handleCreatePostSubmit}
          onSaveDraft={(draft) => setDrafts([draft, ...drafts])}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(name) => {
            setIsLoggedIn(true);
            setUser(prev => ({
              ...prev,
              displayName: name,
              username: name
            }));
          }}
        />
      )}

      {activeCommentsPost && (
        <CommentsModal
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
          onAddComment={handleAddComment}
        />
      )}

      {showNotificationsModal && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setShowNotificationsModal(false)}
          onMarkAllRead={handleMarkAllNotificationsRead}
        />
      )}

      {showAdminModal && (
        <AdminPanelModal
          posts={posts}
          onClose={() => setShowAdminModal(false)}
          onDeletePost={handleDeletePost}
        />
      )}
    </div>
  );
}
