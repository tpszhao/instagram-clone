import React,{useState} from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import {toJson} from 'unsplash-js'
import Card from './Card/Card';
import unsplash from '../api'

const sampleData={
    "id": "MAhPucR_Hq4",
    "created_at": "2019-05-27T14:11:35-04:00",
    "updated_at": "2020-02-21T00:02:53-05:00",
    "promoted_at": null,
    "width": 7952,
    "height": 5304,
    "color": "#DF5C2A",
    "description": null,
    "alt_description": "grey and black cafe racer motorcycle",
    "urls": {
    "raw": "https://images.unsplash.com/photo-1558980664-ce6960be307d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwNTY4fQ",
    "full": "https://images.unsplash.com/photo-1558980664-ce6960be307d?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwNTY4fQ",
    "regular": "https://images.unsplash.com/photo-1558980664-ce6960be307d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNTY4fQ",
    "small": "https://images.unsplash.com/photo-1558980664-ce6960be307d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNTY4fQ",
    "thumb": "https://images.unsplash.com/photo-1558980664-ce6960be307d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEwNTY4fQ"
    },
    "links": {
    "self": "https://api.unsplash.com/photos/MAhPucR_Hq4",
    "html": "https://unsplash.com/photos/MAhPucR_Hq4",
    "download": "https://unsplash.com/photos/MAhPucR_Hq4/download",
    "download_location": "https://api.unsplash.com/photos/MAhPucR_Hq4/download"
    },
    "categories": [],
    "likes": 525,
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
    },
    "sponsorship": {
    "impression_urls": [
        "https://secure.insightexpressai.com/adServer/adServerESI.aspx?script=false&bannerID=4948130&rnd=unsplash&redir=https://secure.insightexpressai.com/adserver/1pixel.gif"
    ],
    "tagline": "Explore the world of H-D",
    "sponsor": {
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

export default function LatestPhoto() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async()=>{
        try{
            const response = await unsplash.photos.listPhotos(page, 15, "latest");
            const json = await toJson(response);
            if(!json.length){
            console.log("no more photos")
            setHasMore(false);
            }
            setPhotos([...photos, ...json]);
            setPage(page + 1);
        }catch{
            setPhotos([...photos,sampleData]);
        }
    }

    const InfiniteScrollStyle ={
        maxWidth:'616px',
        margin:'16px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        flexWrap:'nowrap'
    }


    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={<div key={0}>Loading ...</div>}
            useWindow={true}>
                <div style={InfiniteScrollStyle}>
                    {photos.map((photo,i)=> <Card key={i} photo={photo}/>)}
                </div>
        </InfiniteScroll>
    )
}
