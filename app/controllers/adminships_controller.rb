class AdminshipsController < ApplicationController
  layout false
  
  def index
    @users = User.all
  end
  
  def by_month
    year = params[:year].to_i
    month = params[:month].to_i
    adminships = Adminship.find :all, :conditions => ["EXTRACT(month from date) = ? and EXTRACT(year from date) = ?", month, year]
    user_ids = User.all.collect(&:id)
    by_date = {}
    date = Date.new(year, month, 1)
    while date.month == month do
      by_date[date] = { :date => date.day }
      user_ids.each { |id| by_date[date][id] = "" }
      date = date.next
    end
    
    result = adminships.inject(by_date) do |hash, adm|
      hash[adm.date] ||= {}
      hash[adm.date][adm.user_id] = adm.hours
      hash[adm.date][:date] = adm.date.day
      hash
    end.values
    render :json => { :adminships => result.sort_by { |a| a[:date] } }.to_json
  end
  
  def save
    year = params[:year].to_i
    month = params[:month].to_i
    day = params[:adminships].delete(:date).to_i
    adminships = Adminship.find :all, :conditions => ["EXTRACT(month from date) = ? and EXTRACT(year from date) = ? and EXTRACT(day from date) = ?", month, year, day]
    by_user_ids = adminships.inject({}) { |h, a| h[a.user_id] = a; h }
    params[:adminships].each do |user_id, hours|
      user_id = user_id.to_i
      if by_user_ids.has_key? user_id
        adm = by_user_ids[user_id]
        if hours.blank?
          adm.destroy
        else
          adm.hours = hours
          adm.save
        end
      else
        unless hours.blank?
          Adminship.create :date => Date.civil(year, month, day), :user_id => user_id, :hours => hours
        end
      end
    end
    render :json => { :success => true }
  end
end
