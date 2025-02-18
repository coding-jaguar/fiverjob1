const stri = `have you checked out @AuthorC's latest book? it's receiving rave reviews, and rumor has it that @CelebrityZ is picking it for their upcoming book club. perfect timing for cozy reading sessions

the latest book by @AuthorD is an absolute page-turner. can't wait to see how it influences the next wave of book-to-screen adaptations. which stories do you want to see on screen?  

if you're looking for a fresh perspective, don't miss @AuthorE's thought-provoking memoir. it's been making waves among celebrities and readers alike. who else has had a profound read lately?

i love seeing how social media shapes our reading habits. the latest trends on @Goodreads are all about uncovering hidden gems. what’s a book you discovered through an online community?

an exciting time for book lovers! there's a buzz around @AuthorF's new release, and chatter about it in celebrity circles is growing. make sure it’s on your reading list for the season!`;

const li = stri.split("\n").filter((tweet) => tweet.length > 0);
console.log(li);
