# Next.js + TypeScript + Tailwind

Yet another personal starter repo, along with ESLint + Prettier set up.

TODOs:
- Handle error state and empty state
- OG image
- animation with framer

## Notes about OG image generation
The OG image generation required chromium to be installed. On WSL2, use the following command to install it.
```
# install packages
sudo apt-get install -y curl unzip xvfb libxi6 libgconf-2-4 fonts-liberation
# get latest chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

# install it
sudo apt install ./google-chrome-stable_current_amd64.deb

```

There is a bug that cause the OG image generation to not work properly in Node 16. Update the Vercel project to Node 14 to work around this for now. ([See related StackOverflow thread](https://stackoverflow.com/questions/66214552/tmp-chromium-error-while-loading-shared-libraries-libnss3-so-cannot-open-sha/72626919#72626919))
