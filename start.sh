# cd dist
# pm2 start http-server --name fe_server -- -p 8019 

# http-server -p 8019 

git pull
sudo rm -rf /usr/share/nginx/html
sudo cp -r  /home/lighthouse/Subtle-Stirrings-fe/dist /usr/share/nginx/html
sudo systemctl restart nginx