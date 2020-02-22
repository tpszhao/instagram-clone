import React,{useState,useEffect} from 'react'
import {toJson} from 'unsplash-js'
import {PhotoGrid} from '../Components'
import unsplash from '../api'
import styles from './UserPage.module.css'



const sampleUser={
    "id": "XnhDFu3Jr-A",
    "updated_at": "2020-02-21T16:41:11-05:00",
    "username": "harleydavidson",
    "name": "Harley-Davidson",
    "first_name": "Harley-Davidson",
    "last_name": null,
    "twitter_username": "harleydavidson",
    "portfolio_url": "https://www.harley-davidson.com/",
    "bio": "All for Freedom, Freedom for All. ",
    "location": "Milwaukee, WI",
    "links": {
        "self": "https://api.unsplash.com/users/harleydavidson",
        "html": "https://unsplash.com/@harleydavidson",
        "photos": "https://api.unsplash.com/users/harleydavidson/photos",
        "likes": "https://api.unsplash.com/users/harleydavidson/likes",
        "portfolio": "https://api.unsplash.com/users/harleydavidson/portfolio",
        "following": "https://api.unsplash.com/users/harleydavidson/following",
        "followers": "https://api.unsplash.com/users/harleydavidson/followers"
    },
    "profile_image": {
        "small": "https://images.unsplash.com/profile-1581523732368-f052bf86083dimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
        "medium": "https://images.unsplash.com/profile-1581523732368-f052bf86083dimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
        "large": "https://images.unsplash.com/profile-1581523732368-f052bf86083dimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "instagram_username": "harleydavidson",
    "total_collections": 2,
    "total_likes": 45,
    "total_photos": 53,
    "accepted_tos": true,
    "followed_by_user": false,
    "photos": [
        {
        "id": "kdGstD3te3M",
        "created_at": "2019-05-27T14:23:58-04:00",
        "updated_at": "2020-02-21T00:03:10-05:00",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1",
            "full": "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
            "regular": "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
            "small": "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
            "thumb": "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
        }
        },
        {
        "id": "AyH9hAmiX9Y",
        "created_at": "2019-05-27T14:23:58-04:00",
        "updated_at": "2020-02-21T00:03:52-05:00",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1558981420-c532902e58b4?ixlib=rb-1.2.1",
            "full": "https://images.unsplash.com/photo-1558981420-c532902e58b4?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
            "regular": "https://images.unsplash.com/photo-1558981420-c532902e58b4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
            "small": "https://images.unsplash.com/photo-1558981420-c532902e58b4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
            "thumb": "https://images.unsplash.com/photo-1558981420-c532902e58b4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
        }
        },
        {
        "id": "1HZcJjdtc9g",
        "created_at": "2019-05-27T14:31:44-04:00",
        "updated_at": "2020-02-21T00:04:00-05:00",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1",
            "full": "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
            "regular": "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
            "small": "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
            "thumb": "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
        }
    }
    ],
    "badge": {
        "title": "Verified",
        "primary": true,
        "slug": "verified",
        "link": null
    },
    "tags": {
        "custom": [
        {
            "type": "landing_page",
            "title": "Motorcycles",
            "source": {
            "ancestry": {
                "type": {
                "slug": "images",
                "pretty_slug": "Images"
                },
                "category": {
                "slug": "things",
                "pretty_slug": "Things"
                },
                "subcategory": {
                "slug": "motorcycle",
                "pretty_slug": "Motorcycle"
                }
            },
            "title": "Motorcycle Images",
            "subtitle": "Download free motorcycle images",
            "description": "Choose from a curated selection of motorcycle photos. Always free on Unsplash.",
            "meta_title": "900+ Motorcycle Images: Download HD Pictures & Photos on Unsplash",
            "meta_description": "Choose from hundreds of free motorcycle photos. Download HD motorcycle pictures for free on Unsplash.",
            "cover_photo": {
                "id": "eeTJKC_wz34",
                "created_at": "2019-05-27T14:23:58-04:00",
                "updated_at": "2020-01-21T00:03:04-05:00",
                "promoted_at": null,
                "width": 5250,
                "height": 3502,
                "color": "#D9E2EA",
                "description": null,
                "alt_description": "black and orange motorcycle",
                "urls": {
                "raw": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/eeTJKC_wz34",
                "html": "https://unsplash.com/photos/eeTJKC_wz34",
                "download": "https://unsplash.com/photos/eeTJKC_wz34/download",
                "download_location": "https://api.unsplash.com/photos/eeTJKC_wz34/download"
                },
                "categories": [],
                "likes": 597,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "XnhDFu3Jr-A",
                "updated_at": "2020-01-23T08:58:13-05:00",
                "username": "harleydavidson",
                "name": "Harley-Davidson",
                "first_name": "Harley-Davidson",
                "last_name": null,
                "twitter_username": "harleydavidson",
                "portfolio_url": "https://www.harley-davidson.com/",
                "bio": "All for Freedom, Freedom for All. ",
                "location": "Milwaukee, WI",
                "links": {
                    "self": "https://api.unsplash.com/users/harleydavidson",
                    "html": "https://unsplash.com/@harleydavidson",
                    "photos": "https://api.unsplash.com/users/harleydavidson/photos",
                    "likes": "https://api.unsplash.com/users/harleydavidson/likes",
                    "portfolio": "https://api.unsplash.com/users/harleydavidson/portfolio",
                    "following": "https://api.unsplash.com/users/harleydavidson/following",
                    "followers": "https://api.unsplash.com/users/harleydavidson/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": "harleydavidson",
                "total_collections": 2,
                "total_likes": 45,
                "total_photos": 53,
                "accepted_tos": true
                }
            }
            }
        },
        {
            "type": "search",
            "title": "Explore"
        },
        {
            "type": "search",
            "title": "Freedom"
        },
        {
            "type": "search",
            "title": "Adventure"
        },
        {
            "type": "search",
            "title": "Innovation"
        }
        ],
        "aggregated": [
        {
            "type": "search",
            "title": "rider"
        },
        {
            "type": "landing_page",
            "title": "motorcycle",
            "source": {
            "ancestry": {
                "type": {
                "slug": "images",
                "pretty_slug": "Images"
                },
                "category": {
                "slug": "things",
                "pretty_slug": "Things"
                },
                "subcategory": {
                "slug": "motorcycle",
                "pretty_slug": "Motorcycle"
                }
            },
            "title": "Motorcycle Images",
            "subtitle": "Download free motorcycle images",
            "description": "Choose from a curated selection of motorcycle photos. Always free on Unsplash.",
            "meta_title": "900+ Motorcycle Images: Download HD Pictures & Photos on Unsplash",
            "meta_description": "Choose from hundreds of free motorcycle photos. Download HD motorcycle pictures for free on Unsplash.",
            "cover_photo": {
                "id": "eeTJKC_wz34",
                "created_at": "2019-05-27T14:23:58-04:00",
                "updated_at": "2020-01-21T00:03:04-05:00",
                "promoted_at": null,
                "width": 5250,
                "height": 3502,
                "color": "#D9E2EA",
                "description": null,
                "alt_description": "black and orange motorcycle",
                "urls": {
                "raw": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/eeTJKC_wz34",
                "html": "https://unsplash.com/photos/eeTJKC_wz34",
                "download": "https://unsplash.com/photos/eeTJKC_wz34/download",
                "download_location": "https://api.unsplash.com/photos/eeTJKC_wz34/download"
                },
                "categories": [],
                "likes": 597,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "XnhDFu3Jr-A",
                "updated_at": "2020-01-23T08:58:13-05:00",
                "username": "harleydavidson",
                "name": "Harley-Davidson",
                "first_name": "Harley-Davidson",
                "last_name": null,
                "twitter_username": "harleydavidson",
                "portfolio_url": "https://www.harley-davidson.com/",
                "bio": "All for Freedom, Freedom for All. ",
                "location": "Milwaukee, WI",
                "links": {
                    "self": "https://api.unsplash.com/users/harleydavidson",
                    "html": "https://unsplash.com/@harleydavidson",
                    "photos": "https://api.unsplash.com/users/harleydavidson/photos",
                    "likes": "https://api.unsplash.com/users/harleydavidson/likes",
                    "portfolio": "https://api.unsplash.com/users/harleydavidson/portfolio",
                    "following": "https://api.unsplash.com/users/harleydavidson/following",
                    "followers": "https://api.unsplash.com/users/harleydavidson/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1556751276456-1561737ea797?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": "harleydavidson",
                "total_collections": 2,
                "total_likes": 45,
                "total_photos": 53,
                "accepted_tos": true
                }
            }
            }
        },
        {
            "type": "search",
            "title": "speed"
        },
        {
            "type": "search",
            "title": "fast"
        },
        {
            "type": "search",
            "title": "biker"
        },
        {
            "type": "search",
            "title": "road"
        },
        {
            "type": "search",
            "title": "bike"
        },
        {
            "type": "search",
            "title": "motorbike"
        },
        {
            "type": "landing_page",
            "title": "harley-davidson",
            "source": {
            "ancestry": {
                "type": {
                "slug": "wallpapers",
                "pretty_slug": "HD Wallpapers"
                },
                "category": {
                "slug": "companies",
                "pretty_slug": "Companies"
                },
                "subcategory": {
                "slug": "harley-davidson",
                "pretty_slug": "Harley Davidson"
                }
            },
            "title": "HD Harley Davidson Wallpapers",
            "subtitle": "Download Free Harley Davidson Wallpapers",
            "description": "Choose from a curated selection of Harley Davidson wallpapers for your mobile and desktop screens. Always free on Unsplash.",
            "meta_title": "Harley Davidson Wallpapers: Free HD Download [500+ HQ] | Unsplash",
            "meta_description": "Choose from hundreds of free Harley Davidson wallpapers. Download HD wallpapers for free on Unsplash.",
            "cover_photo": {
                "id": "YsMg1pJqqKk",
                "created_at": "2019-05-27T14:17:46-04:00",
                "updated_at": "2020-02-21T00:04:58-05:00",
                "promoted_at": null,
                "width": 5830,
                "height": 3887,
                "color": "#EDA34D",
                "description": null,
                "alt_description": "close-up photography of black motorcycle",
                "urls": {
                "raw": "https://images.unsplash.com/photo-1558981033-0f0309284409?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1558981033-0f0309284409?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1558981033-0f0309284409?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1558981033-0f0309284409?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1558981033-0f0309284409?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/YsMg1pJqqKk",
                "html": "https://unsplash.com/photos/YsMg1pJqqKk",
                "download": "https://unsplash.com/photos/YsMg1pJqqKk/download",
                "download_location": "https://api.unsplash.com/photos/YsMg1pJqqKk/download"
                },
                "categories": [],
                "likes": 561,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "XnhDFu3Jr-A",
                "updated_at": "2020-02-20T23:41:26-05:00",
                "username": "harleydavidson",
                "name": "Harley-Davidson",
                "first_name": "Harley-Davidson",
                "last_name": null,
                "twitter_username": "harleydavidson",
                "portfolio_url": "https://www.harley-davidson.com/",
                "bio": "All for Freedom, Freedom for All. ",
                "location": "Milwaukee, WI",
                "links": {
                    "self": "https://api.unsplash.com/users/harleydavidson",
                    "html": "https://unsplash.com/@harleydavidson",
                    "photos": "https://api.unsplash.com/users/harleydavidson/photos",
                    "likes": "https://api.unsplash.com/users/harleydavidson/likes",
                    "portfolio": "https://api.unsplash.com/users/harleydavidson/portfolio",
                    "following": "https://api.unsplash.com/users/harleydavidson/following",
                    "followers": "https://api.unsplash.com/users/harleydavidson/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1581523732368-f052bf86083dimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1581523732368-f052bf86083dimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1581523732368-f052bf86083dimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": "harleydavidson",
                "total_collections": 2,
                "total_likes": 45,
                "total_photos": 53,
                "accepted_tos": true
                }
            }
            }
        },
        {
            "type": "search",
            "title": "wheel"
        },
        {
            "type": "landing_page",
            "title": "tree",
            "source": {
            "ancestry": {
                "type": {
                "slug": "images",
                "pretty_slug": "Images"
                },
                "category": {
                "slug": "nature",
                "pretty_slug": "Nature"
                },
                "subcategory": {
                "slug": "tree",
                "pretty_slug": "Tree"
                }
            },
            "title": "Tree Images",
            "subtitle": "Download free tree images",
            "description": "Choose from a curated selection of tree photos. Always free on Unsplash.",
            "meta_title": "900+ Tree Images: Download HD Pictures & Photos on Unsplash",
            "meta_description": "Choose from hundreds of free tree photos. Download HD tree pictures for free on Unsplash.",
            "cover_photo": {
                "id": "rY7snNB4zFk",
                "created_at": "2018-11-25T02:41:18-05:00",
                "updated_at": "2020-01-28T00:02:17-05:00",
                "promoted_at": null,
                "width": 2640,
                "height": 3960,
                "color": "#F2C6B3",
                "description": null,
                "alt_description": "close-up photography of green-leafed tree",
                "urls": {
                "raw": "https://images.unsplash.com/photo-1543130732-4b8da601004b?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1543130732-4b8da601004b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1543130732-4b8da601004b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1543130732-4b8da601004b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1543130732-4b8da601004b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/rY7snNB4zFk",
                "html": "https://unsplash.com/photos/rY7snNB4zFk",
                "download": "https://unsplash.com/photos/rY7snNB4zFk/download",
                "download_location": "https://api.unsplash.com/photos/rY7snNB4zFk/download"
                },
                "categories": [],
                "likes": 48,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "uSeMxnc2zKo",
                "updated_at": "2020-01-07T21:23:35-05:00",
                "username": "menashc",
                "name": "Menash Cohen",
                "first_name": "Menash",
                "last_name": "Cohen",
                "twitter_username": null,
                "portfolio_url": null,
                "bio": null,
                "location": null,
                "links": {
                    "self": "https://api.unsplash.com/users/menashc",
                    "html": "https://unsplash.com/@menashc",
                    "photos": "https://api.unsplash.com/users/menashc/photos",
                    "likes": "https://api.unsplash.com/users/menashc/likes",
                    "portfolio": "https://api.unsplash.com/users/menashc/portfolio",
                    "following": "https://api.unsplash.com/users/menashc/following",
                    "followers": "https://api.unsplash.com/users/menashc/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1542884920533-3655d8c37491?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1542884920533-3655d8c37491?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1542884920533-3655d8c37491?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": null,
                "total_collections": 1,
                "total_likes": 7,
                "total_photos": 11,
                "accepted_tos": true
                }
            }
            }
        },
        {
            "type": "landing_page",
            "title": "cool",
            "source": {
            "ancestry": {
                "type": {
                "slug": "images",
                "pretty_slug": "Images"
                },
                "category": {
                "slug": "feelings",
                "pretty_slug": "Feelings"
                },
                "subcategory": {
                "slug": "cool",
                "pretty_slug": "Cool"
                }
            },
            "title": "Cool Images",
            "subtitle": "Download free cool images",
            "description": "Choose from a curated selection of cool photos. Always free on Unsplash.",
            "meta_title": "900+ Cool Images: Download HD Pictures & Photos on Unsplash",
            "meta_description": "Choose from hundreds of free cool photos. Download HD cool pictures for free on Unsplash.",
            "cover_photo": {
                "id": "e25BPbqHmo4",
                "created_at": "2015-05-11T15:51:26-04:00",
                "updated_at": "2020-01-21T00:04:33-05:00",
                "promoted_at": "2015-05-11T15:51:26-04:00",
                "width": 5460,
                "height": 3638,
                "color": "#E6E6E6",
                "description": "CN Tower Through Clouds",
                "alt_description": "CNN Tower in Canada surrounded by clouds",
                "urls": {
                "raw": "https://images.unsplash.com/photo-1431373878197-8da4e53be0c6?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1431373878197-8da4e53be0c6?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1431373878197-8da4e53be0c6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1431373878197-8da4e53be0c6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1431373878197-8da4e53be0c6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/e25BPbqHmo4",
                "html": "https://unsplash.com/photos/e25BPbqHmo4",
                "download": "https://unsplash.com/photos/e25BPbqHmo4/download",
                "download_location": "https://api.unsplash.com/photos/e25BPbqHmo4/download"
                },
                "categories": [],
                "likes": 332,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "6LVqhgq3v1Q",
                "updated_at": "2020-01-29T05:02:35-05:00",
                "username": "matthewhenry",
                "name": "Matthew Henry",
                "first_name": "Matthew",
                "last_name": "Henry",
                "twitter_username": "MattWiebe2",
                "portfolio_url": "https://instagram.com/matt_henry_photo/",
                "bio": "videographer (vimeo.com/mtthwhnry) & photographer for Shopify located in Toronto, Canada",
                "location": "Toronto, Ontario",
                "links": {
                    "self": "https://api.unsplash.com/users/matthewhenry",
                    "html": "https://unsplash.com/@matthewhenry",
                    "photos": "https://api.unsplash.com/users/matthewhenry/photos",
                    "likes": "https://api.unsplash.com/users/matthewhenry/likes",
                    "portfolio": "https://api.unsplash.com/users/matthewhenry/portfolio",
                    "following": "https://api.unsplash.com/users/matthewhenry/following",
                    "followers": "https://api.unsplash.com/users/matthewhenry/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1442074255542-361bdf6cae55?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1442074255542-361bdf6cae55?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1442074255542-361bdf6cae55?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": "matt_henry_photo",
                "total_collections": 9,
                "total_likes": 488,
                "total_photos": 75,
                "accepted_tos": true
                }
            }
            }
        },
        {
            "type": "search",
            "title": "electric motorcycle"
        },
        {
            "type": "search",
            "title": "open road"
        },
        {
            "type": "search",
            "title": "road trip"
        },
        {
            "type": "search",
            "title": "electric bike"
        },
        {
            "type": "search",
            "title": "livewire"
        },
        {
            "type": "search",
            "title": "ebike"
        },
        {
            "type": "search",
            "title": "freedom"
        },
        {
            "type": "search",
            "title": "adventure"
        },
        {
            "type": "landing_page",
            "title": "travel",
            "source": {
            "ancestry": {
                "type": {
                "slug": "images",
                "pretty_slug": "Images"
                },
                "category": {
                "slug": "travel",
                "pretty_slug": "Travel"
                }
            },
            "title": "Travel Images",
            "subtitle": "Download free travel images",
            "description": "Choose from a curated selection of travel photos. Always free on Unsplash.",
            "meta_title": "900+ Travel Images: Download HD Pictures & Photos on Unsplash",
            "meta_description": "Choose from hundreds of free travel photos. Download HD travel pictures for free on Unsplash.",
            "cover_photo": {
                "id": "wGu1pzDSm3g",
                "created_at": "2017-12-08T13:31:10-05:00",
                "updated_at": "2020-02-14T00:03:35-05:00",
                "promoted_at": "2017-12-09T14:22:47-05:00",
                "width": 3444,
                "height": 5166,
                "color": "#25211A",
                "description": "Signs At The Beach",
                "alt_description": "brown wooden road sign during daytime",
                "urls": {
                "raw": "https://images.unsplash.com/photo-1512757776214-26d36777b513?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1512757776214-26d36777b513?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1512757776214-26d36777b513?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1512757776214-26d36777b513?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1512757776214-26d36777b513?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/wGu1pzDSm3g",
                "html": "https://unsplash.com/photos/wGu1pzDSm3g",
                "download": "https://unsplash.com/photos/wGu1pzDSm3g/download",
                "download_location": "https://api.unsplash.com/photos/wGu1pzDSm3g/download"
                },
                "categories": [],
                "likes": 421,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "wvN9tzXU4n0",
                "updated_at": "2020-02-14T11:25:02-05:00",
                "username": "martenbjork",
                "name": "Marten Bjork",
                "first_name": "Marten",
                "last_name": "Bjork",
                "twitter_username": "martenbjork",
                "portfolio_url": "https://www.instagram.com/marten_bjork",
                "bio": "I'm a designer, developer and photographer. Most photos taken with Canon 5D or iPhone X. 🌮 ",
                "location": "Ottawa",
                "links": {
                    "self": "https://api.unsplash.com/users/martenbjork",
                    "html": "https://unsplash.com/@martenbjork",
                    "photos": "https://api.unsplash.com/users/martenbjork/photos",
                    "likes": "https://api.unsplash.com/users/martenbjork/likes",
                    "portfolio": "https://api.unsplash.com/users/martenbjork/portfolio",
                    "following": "https://api.unsplash.com/users/martenbjork/following",
                    "followers": "https://api.unsplash.com/users/martenbjork/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1497718736614-d69060ff7294?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1497718736614-d69060ff7294?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1497718736614-d69060ff7294?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": "marten_bjork",
                "total_collections": 0,
                "total_likes": 61,
                "total_photos": 124,
                "accepted_tos": true
                }
            }
            }
        },
        {
            "type": "search",
            "title": "chopper"
        },
        {
            "type": "landing_page",
            "title": "background",
            "source": {
            "ancestry": {
                "type": {
                "slug": "backgrounds",
                "pretty_slug": "Backgrounds"
                }
            },
            "title": "HQ Background Images",
            "subtitle": "Download Free Backgrounds",
            "description": "Browse our beautiful selection of free background images–all submitted by our community of talented contributors and completely free to download and use.",
            "meta_title": "Best 100+ Free Background Images [HD] | Download your next background photo on Unsplash",
            "meta_description": "Download the perfect background images. Find over 100+ of the best free background images. Free for commercial use ✓ No attribution required ✓ Copyright-free ✓",
            "cover_photo": {
                "id": "fMUIVein7Ng",
                "created_at": "2017-05-15T19:49:10-04:00",
                "updated_at": "2020-02-14T00:02:38-05:00",
                "promoted_at": "2017-05-16T05:06:41-04:00",
                "width": 3847,
                "height": 5583,
                "color": "#131117",
                "description": "After getting many photos for a project, I am also trying to get images to share with the Unsplash community. Here’s an attempt at abstracting a detail of the amazing architecture of CCPV.",
                "alt_description": "closeup photo of black and red building",
                "urls": {
                "raw": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/fMUIVein7Ng",
                "html": "https://unsplash.com/photos/fMUIVein7Ng",
                "download": "https://unsplash.com/photos/fMUIVein7Ng/download",
                "download_location": "https://api.unsplash.com/photos/fMUIVein7Ng/download"
                },
                "categories": [],
                "likes": 1229,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "hnq0aaqF_Qo",
                "updated_at": "2020-02-16T11:34:26-05:00",
                "username": "scottwebb",
                "name": "Scott Webb",
                "first_name": "Scott",
                "last_name": "Webb",
                "twitter_username": "scotty_webb",
                "portfolio_url": "https://scottwebb.me/",
                "bio": "Have at 'em. Let's connect to collab or drink coffee. Just hit the message button or slide on over to my site 😎",
                "location": "London, Ontario, Canada",
                "links": {
                    "self": "https://api.unsplash.com/users/scottwebb",
                    "html": "https://unsplash.com/@scottwebb",
                    "photos": "https://api.unsplash.com/users/scottwebb/photos",
                    "likes": "https://api.unsplash.com/users/scottwebb/likes",
                    "portfolio": "https://api.unsplash.com/users/scottwebb/portfolio",
                    "following": "https://api.unsplash.com/users/scottwebb/following",
                    "followers": "https://api.unsplash.com/users/scottwebb/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1441301120788-eb1f8dca3bc5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1441301120788-eb1f8dca3bc5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1441301120788-eb1f8dca3bc5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": "scottwebb",
                "total_collections": 41,
                "total_likes": 2659,
                "total_photos": 644,
                "accepted_tos": true
                }
            }
            }
        },
        {
            "type": "landing_page",
            "title": "wallpaper",
            "source": {
            "ancestry": {
                "type": {
                "slug": "wallpapers",
                "pretty_slug": "HD Wallpapers"
                }
            },
            "title": "HD Wallpapers",
            "subtitle": "Download Free Wallpapers",
            "description": "Choose from the highest quality selection of high-definition wallpapers–all submitted by our talented community of contributors. Free to download and use for your mobile and desktop screens.",
            "meta_title": "Download Free HD Wallpapers [Mobile + Desktop] | Unsplash",
            "meta_description": "Download the best HD and Ultra HD Wallpapers for free. Use them as wallpapers for your mobile or desktop screens.",
            "cover_photo": {
                "id": "VEkIsvDviSs",
                "created_at": "2018-10-23T01:38:21-04:00",
                "updated_at": "2020-02-07T00:03:14-05:00",
                "promoted_at": "2018-10-24T09:12:35-04:00",
                "width": 5000,
                "height": 3333,
                "color": "#0D172E",
                "description": "Life is full of adventures. This image was created during one of my own adventures on the top of Fronalpstock in Switzerland. During the day thousands and thousands of tourists  where passing by this spot. But the last chairlift was running at 5:30pm. Suddently the place became very quiet and calm. The fog started to clear up and reveal the two peaks.  This image represents one of the most beautiful sunsets I ever saw.",
                "alt_description": null,
                "urls": {
                "raw": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/VEkIsvDviSs",
                "html": "https://unsplash.com/photos/VEkIsvDviSs",
                "download": "https://unsplash.com/photos/VEkIsvDviSs/download",
                "download_location": "https://api.unsplash.com/photos/VEkIsvDviSs/download"
                },
                "categories": [],
                "likes": 513,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "1oL7MvktvW4",
                "updated_at": "2020-01-29T17:49:05-05:00",
                "username": "borisbaldinger",
                "name": "Boris Baldinger",
                "first_name": "Boris",
                "last_name": "Baldinger",
                "twitter_username": "borisbaldinger",
                "portfolio_url": "https://www.boris-baldinger.com",
                "bio": "Father of 3 | Business photographer with a fable for nature | Speaker | Teacher | Social Media Fan",
                "location": "Switzerland",
                "links": {
                    "self": "https://api.unsplash.com/users/borisbaldinger",
                    "html": "https://unsplash.com/@borisbaldinger",
                    "photos": "https://api.unsplash.com/users/borisbaldinger/photos",
                    "likes": "https://api.unsplash.com/users/borisbaldinger/likes",
                    "portfolio": "https://api.unsplash.com/users/borisbaldinger/portfolio",
                    "following": "https://api.unsplash.com/users/borisbaldinger/following",
                    "followers": "https://api.unsplash.com/users/borisbaldinger/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1552053169443-ad3a5339ce69?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1552053169443-ad3a5339ce69?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1552053169443-ad3a5339ce69?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": "borisbaldinger",
                "total_collections": 0,
                "total_likes": 47,
                "total_photos": 12,
                "accepted_tos": false
                }
            }
            }
        },
        {
            "type": "search",
            "title": "outdoor"
        },
        {
            "type": "search",
            "title": "shelf"
        },
        {
            "type": "search",
            "title": "flame"
        },
        {
            "type": "landing_page",
            "title": "fire",
            "source": {
            "ancestry": {
                "type": {
                "slug": "wallpapers",
                "pretty_slug": "HD Wallpapers"
                },
                "category": {
                "slug": "nature",
                "pretty_slug": "Nature"
                },
                "subcategory": {
                "slug": "fire",
                "pretty_slug": "Fire"
                }
            },
            "title": "HD Fire Wallpapers",
            "subtitle": "Download Free Fire Wallpapers",
            "description": "Choose from a curated selection of fire wallpapers for your mobile and desktop screens. Always free on Unsplash.",
            "meta_title": "Fire Wallpapers: Free HD Download [500+ HQ] | Unsplash",
            "meta_description": "Choose from hundreds of free fire wallpapers. Download HD wallpapers for free on Unsplash.",
            "cover_photo": {
                "id": "BdTtvBRhOng",
                "created_at": "2018-02-02T13:01:19-05:00",
                "updated_at": "2020-01-21T00:06:16-05:00",
                "promoted_at": "2018-02-03T07:25:07-05:00",
                "width": 2304,
                "height": 1536,
                "color": "#FEE571",
                "description": "Fire on the Horizon",
                "alt_description": "red fire digital wallpaper",
                "urls": {
                "raw": "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/BdTtvBRhOng",
                "html": "https://unsplash.com/photos/BdTtvBRhOng",
                "download": "https://unsplash.com/photos/BdTtvBRhOng/download",
                "download_location": "https://api.unsplash.com/photos/BdTtvBRhOng/download"
                },
                "categories": [],
                "likes": 389,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "Edg-hHn0oT4",
                "updated_at": "2020-01-15T19:40:12-05:00",
                "username": "cullansmith",
                "name": "Cullan Smith",
                "first_name": "Cullan",
                "last_name": "Smith",
                "twitter_username": "CullanSmithYT",
                "portfolio_url": "https://twitter.com/CullanSmithYT?s=09",
                "bio": "View Images curated by Cullan",
                "location": null,
                "links": {
                    "self": "https://api.unsplash.com/users/cullansmith",
                    "html": "https://unsplash.com/@cullansmith",
                    "photos": "https://api.unsplash.com/users/cullansmith/photos",
                    "likes": "https://api.unsplash.com/users/cullansmith/likes",
                    "portfolio": "https://api.unsplash.com/users/cullansmith/portfolio",
                    "following": "https://api.unsplash.com/users/cullansmith/following",
                    "followers": "https://api.unsplash.com/users/cullansmith/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1551449327987-d6db6adb9c25?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1551449327987-d6db6adb9c25?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1551449327987-d6db6adb9c25?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": "cullansmith",
                "total_collections": 1,
                "total_likes": 14,
                "total_photos": 11,
                "accepted_tos": true
                }
            }
            }
        },
        {
            "type": "landing_page",
            "title": "mountain",
            "source": {
            "ancestry": {
                "type": {
                "slug": "images",
                "pretty_slug": "Images"
                },
                "category": {
                "slug": "nature",
                "pretty_slug": "Nature"
                },
                "subcategory": {
                "slug": "mountain",
                "pretty_slug": "Mountain"
                }
            },
            "title": "Mountain Images",
            "subtitle": "Download free mountain images",
            "description": "Choose from a curated selection of mountain photos. Always free on Unsplash.",
            "meta_title": "900+ Mountain Images: Download HD Pictures & Photos on Unsplash",
            "meta_description": "Choose from hundreds of free mountain photos. Download HD mountain pictures for free on Unsplash.",
            "cover_photo": {
                "id": "4igCpD-Lnfg",
                "created_at": "2018-11-19T16:23:41-05:00",
                "updated_at": "2020-02-14T00:02:32-05:00",
                "promoted_at": null,
                "width": 2584,
                "height": 4592,
                "color": "#AE9389",
                "description": "Scottish Landscape",
                "alt_description": "mountains during golden hour",
                "urls": {
                "raw": "https://images.unsplash.com/photo-1542662565-7e4b66bae529?ixlib=rb-1.2.1",
                "full": "https://images.unsplash.com/photo-1542662565-7e4b66bae529?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
                "regular": "https://images.unsplash.com/photo-1542662565-7e4b66bae529?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "small": "https://images.unsplash.com/photo-1542662565-7e4b66bae529?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                "thumb": "https://images.unsplash.com/photo-1542662565-7e4b66bae529?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max"
                },
                "links": {
                "self": "https://api.unsplash.com/photos/4igCpD-Lnfg",
                "html": "https://unsplash.com/photos/4igCpD-Lnfg",
                "download": "https://unsplash.com/photos/4igCpD-Lnfg/download",
                "download_location": "https://api.unsplash.com/photos/4igCpD-Lnfg/download"
                },
                "categories": [],
                "likes": 201,
                "liked_by_user": false,
                "current_user_collections": [],
                "user": {
                "id": "gqsrYHI75CI",
                "updated_at": "2020-02-15T08:04:31-05:00",
                "username": "jonnymckenna",
                "name": "Jonny McKenna",
                "first_name": "Jonny",
                "last_name": "McKenna",
                "twitter_username": null,
                "portfolio_url": "http://www.jonnymckenna.com",
                "bio": "Half mountain goat",
                "location": "Scotland",
                "links": {
                    "self": "https://api.unsplash.com/users/jonnymckenna",
                    "html": "https://unsplash.com/@jonnymckenna",
                    "photos": "https://api.unsplash.com/users/jonnymckenna/photos",
                    "likes": "https://api.unsplash.com/users/jonnymckenna/likes",
                    "portfolio": "https://api.unsplash.com/users/jonnymckenna/portfolio",
                    "following": "https://api.unsplash.com/users/jonnymckenna/following",
                    "followers": "https://api.unsplash.com/users/jonnymckenna/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1524903843310-228e1258a980?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    "medium": "https://images.unsplash.com/profile-1524903843310-228e1258a980?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    "large": "https://images.unsplash.com/profile-1524903843310-228e1258a980?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                },
                "instagram_username": "jonny__mckenna",
                "total_collections": 0,
                "total_likes": 44,
                "total_photos": 44,
                "accepted_tos": true
                }
            }
            }
        },
        {
            "type": "search",
            "title": "boot"
        }
        ]
    },
    "followers_count": 1253,
    "following_count": 0,
    "allow_messages": false,
    "numeric_id": 2728079,
    "downloads": 2077708
}

export default function UserPage(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        unsplash.users
            .profile(props.match.params.username)
            .then(toJson)
            .then(json => {
                setUser(json);
            });
    }, [props.match.params.username]);

    if(!user) return null;
    return (
        <div className={styles.container}>
            <div className={styles.userheader}>
                <img 
                    className={styles.profile_image} 
                    src={user.profile_image.large} 
                    alt="avatar"/>
                <span className={styles.username}>{user.name}</span>
                <div className={styles.userstat}>
                    <span>{user.total_likes} likes</span>
                    <span>{user.total_photos} photos</span>
                    <span>{user.followers_count} followers</span>
                </div>
            </div>
            <PhotoGrid username={user.username} className={styles.photoGrid}/>
        </div>
    )
}
