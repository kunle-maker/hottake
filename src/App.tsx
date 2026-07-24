import React, { useState, useEffect } from 'react';
import { User, Post, Community, NotificationItem, AgedLikeVote, HotMeterLevel, CommunityVerdict } from './types';
import { CURRENT_USER, INITIAL_POSTS, COMMUNITIES, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { HomeFeed } from './components/HomeFeed';
import { SearchExploreView } from './components/SearchExploreView';
import { CommunitiesView } from './components/CommunitiesView';
import { ProfileView } from './components/ProfileView';
import { CreatePostModal } from './components/CreatePostModal';
import { AuthModal } from './components/AuthModal';
import { CommentsModal } from './components/CommentsModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { CreditsModal } from './components/CreditsModal';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('hottakes_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('hottakes_is_logged_in');
    return saved === 'true';
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('hottakes_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [communities] = useState<Community[]>(COMMUNITIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [drafts, setDrafts] = useState<string[]>(['Arsenal mid structure is severely underrated when Merino drops deep...']);

  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

  // Modals
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);

  // Theme State (Dark / Light Mode)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('hottakes_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hottakes_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hottakes_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist local state
  useEffect(() => {
    localStorage.setItem('hottakes_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hottakes_posts', JSON.stringify(posts));
  }, [posts]);

  // Fetch initial posts on mount
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.posts) {
          setPosts(data.posts);
        }
      })
      .catch(err => console.error("Error fetching posts:", err));
  }, []);

  // Actions connected to Backend API
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

    fetch(`/api/posts/${postId}/like`, { method: 'POST' })
      .catch(err => console.error("Like post API error:", err));
  };

  const handleVoteAged = (postId: string, vote: AgedLikeVote) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        if (p.myAgedVote === vote) return p;
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

    fetch(`/api/posts/${postId}/vote-aged`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote })
    }).catch(err => console.error("Vote aged API error:", err));
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
    const postPayload = {
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
      hotMeter: data.hotMeter,
      communityVerdict: data.communityVerdict
    };

    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postPayload)
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.post) {
          setPosts(prev => [resData.post, ...prev]);
        }
      })
      .catch(err => {
        console.error("Create post API error, adding locally:", err);
        const fallbackPost: Post = {
          id: `post_${Date.now()}`,
          ...postPayload,
          createdAt: 'Just now',
          agedLikeWineVotes: 1,
          agedLikeMilkVotes: 0,
          likesCount: 1,
          isLikedByMe: true,
          commentsCount: 0,
          repostsCount: 0
        };
        setPosts(prev => [fallbackPost, ...prev]);
      });

    setUser(prev => ({
      ...prev,
      xp: prev.xp + 50,
      totalPosts: prev.totalPosts + 1
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

  // Gatekeeping: If user is not logged in, present the Landing Page & Auth screen
  if (!isLoggedIn) {
    return (
      <LandingPage
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          setIsLoggedIn(true);
          localStorage.setItem('hottakes_is_logged_in', 'true');
          localStorage.setItem('hottakes_user', JSON.stringify(loggedUser));
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
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
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
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
              localStorage.setItem('hottakes_is_logged_in', 'false');
            }}
            onOpenAdmin={() => setShowAdminModal(true)}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode((prev) => !prev)}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setSelectedCommunityId(null);
          setActiveTab(tab);
        }}
        onOpenCreatePost={() => setShowCreatePostModal(true)}
        onOpenCredits={() => setShowCreditsModal(true)}
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
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
            setIsLoggedIn(true);
            localStorage.setItem('hottakes_is_logged_in', 'true');
            localStorage.setItem('hottakes_user', JSON.stringify(loggedUser));
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

      {showCreditsModal && (
        <CreditsModal
          onClose={() => setShowCreditsModal(false)}
        />
      )}
    </div>
  );
}

