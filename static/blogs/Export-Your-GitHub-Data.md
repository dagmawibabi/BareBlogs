---
title: Export Your GitHub Data
date: 2025-10-28
description: This is a quick exploration of my journey to export and actually own my projects, their source codes and metadata that is hosted on GitHub!
category: "Tech"
---

I don't want to be a fearmonger but one day you wake up, expecting nothing big to happen. You try logging into your GitHub to check notifications and issues only to be met with this page.

![image.png](/blog-images/ExportYourGitHubData/1.jpg)

Then you follow suit and start researching on how to get your precious account back only to find a GitHub community thread of [countless others](https://github.com/orgs/community/discussions/136618) facing the same issue. You go through the threads and they advise you to [contact support](https://support.github.com/request) only to realize that it takes around 5 months for GitHub support to get to your support ticket (if they do). Not to mention, all of this happened not because you did anything wrong but because one auto-filter bot mislabeled your page for suspension! Welp!

With that in mind let’s export, backup and actually own our projects, their source codes and metadata! This is a quick exploration of my journey on how to do it.

### Exporting GitHub Data

So let’s get to it. The first place you’d look to export your GitHub data is at GitHub. With a bit of navigation you can find the option to export your account data under Settings → Account → Export Account Data. It says it will export all your repository and profile metadata.

![image.png](/blog-images/ExportYourGitHubData/2.png)

So click on the “Start Export” button and start the process. GitHub will make you authenticate and then it will email you a link to download your compressed data. So go for it and start the process.

![image.png](/blog-images/ExportYourGitHubData/3.jpg)

![image.png](/blog-images/ExportYourGitHubData/4.jpg)

Now that GitHub has emailed you your data, download it. My data turned out to be 4GB. Now it’s time to extract it. Whoa! That’s a lot of information! So MUCH information. It contains your profile info, releases, attachments (markdown images), bots, PRs, commits, issues, comments, discussions, stars and so much more info.

![image.png](/blog-images/ExportYourGitHubData/5.jpg)

This is great and all but the MAIN and ONLY problem is that it doesn't have your source codes!!! There's a literal folder that says repo and lists all your repo but only has metadata about them and not the actual code. It doesn't make sense to give you the released APKs and images used in your markdowns but not your actual source code. THIS IS GITHUB EXPORT I want the actual source codes as well!!

I dug through their docs and settings but there is no option for you to export all your repositories. I seriously think this is crazy! I’d argue that your source codes are much more important than all the metadata that’s around it. What’s even annoying is that in their [docs](https://github.blog/developer-skills/github/download-your-data/) they say this…

![image.png](/blog-images/ExportYourGitHubData/6.jpg)

Okay GitHub, if it’s “MY DATA” give me it!

### Exporting All Your Repos

So after so much digging around, there is no option for you to export all your repositories. You will have to manually download each repo as a .ZIP or you’ll have to write a script to clone all your repos. Obviously I went with the second option.

I am currently on a Windows machine and decided to use PowerShell to run this simple script.  I am using the GitHub API to go through all the repos in my account an clone them. I would also like to clone my private repos so I generated a Fine-grained Personal Access Token in the [settings](https://github.com/settings/personal-access-tokens) to authenticate and get them. Here is my script:

```js
$username = "YOUR_GITHUB_USERNAME"
$token = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"
$page = 1

while ($true) {
    Write-Host "Fetching page $page..."
    $auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${username}:${token}"))
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos?per_page=100&page=$page" `
        -Headers @{Authorization = "Basic $auth"}

    if (-not $response) {
        Write-Host "No more repositories found."
        break
    }

    foreach ($repo in $response) {
        Write-Host "Cloning $($repo.clone_url)"
        git clone $repo.clone_url
    }

    $page++
}
```
[Download Script](/blog-images/ExportYourGitHubData/github-cloner.ps1)

Now just copy the script to a file called `github-clone.ps1`, replace the first two variables with your GitHub username and Personal Access Token, save it and then move this script into an empty folder. Now open your PowerShell terminal, navigate to this folder that contains your script and run it by just typing this `./github-clone.ps1` If you’ve never ran PowerShell scripts it might throw an error so give PowerShell the ability to run scripts with this command`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` and well that’s it. Now you wait…

![image.png](/blog-images/ExportYourGitHubData/exporting.gif)

And finally it’s done. That took about 15 minutes for me…

![image.png](/blog-images/ExportYourGitHubData/7.jpg)

Let’s see what we got. I have 138 repositories and all that source code and media with it came to be a total of 5.07 GB compressed. Which is really nice and neat taking into consideration that I had stored big sized images and assets.

![image.png](/blog-images/ExportYourGitHubData/8.jpg)

![image.png](/blog-images/ExportYourGitHubData/9.jpg)

Now this is beautiful. A complete backup of all my public and private repositories including forks. Not to mention we’ve also downloaded all the metadata related with all these repos. I am now happy about this. I have backed up all my GitHub data now.

### Summary

So I have a little principle when it comes to data and that is, I should be able to export and have it. That's it. Companies aren't trustworthy enough to keep our privacies and what not, I gave up on that part. But the ability to actually export my data and have a local copy is important. Telegram is my absolute favorite when it comes to this. Then it's YouTube which is extremely good at the amount and type of data they give you. I hate platforms like Snapchat and now GitHub who have the worst export experience.

In total my metadata and repositories combined is 8.81GB as of October 28, 2025

![image.png](/blog-images/ExportYourGitHubData/10.jpg)

I hope you do the same and enjoy owning your data :)
