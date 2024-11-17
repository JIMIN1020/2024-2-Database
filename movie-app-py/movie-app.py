import pymysql

def connect_to_db():
    # MySQL 서버 연결 정보
    host = 'localhost'
    user = 'root'
    password = 'root'
    db = 'MovieApp'
    charset = 'utf8'
    port=3307

    try:
        connection = pymysql.connect(host=host, user=user, password=password, database=db, charset=charset, port=port)
        return connection
    except pymysql.MySQLError as e:
        print(f"연결 실패: {e}")
        return None

 # 회원가입 기능: 유저로부터 이름, ID, 비밀번호를 받아서 User 테이블에 저장
def sign_up(connection):
    # 입력 받기
    name = input("이름을 입력하세요: ")
    user_id = input("ID를 입력하세요: ")
    password = input("비밀번호를 입력하세요: ")

    # INSERT문 작성
    sql = "INSERT INTO User (name, id, password) VALUES (%s, %s, %s)"
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (name, user_id, password))
            connection.commit()
        print("회원가입이 완료되었습니다.")
    except pymysql.MySQLError as e:
        print(f"회원가입 실패: {e}")

# 로그인 기능: 유저로부터 ID와 비밀번호를 받아서 User 테이블에서 확인
def login(connection):
    # 입력 받기
    user_id = input("ID를 입력하세요: ")
    password = input("비밀번호를 입력하세요: ")

    # SELECT문 작성
    sql = "SELECT name FROM User WHERE id = %s AND password = %s"
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (user_id, password))
            result = cursor.fetchone()  # 하나의 결과만 가져오기
            
            if result:
                print(f"반갑습니다, {result[0]}님!")
                return [True, user_id]
            else:
                print("ID 또는 비밀번호가 잘못되었습니다.")
                return [False, '']
    except pymysql.MySQLError as e:
        print(f"로그인 실패: {e}")
        return [False, '']


# 전체 영화 조회 기능
def view_movies(connection, userId):
    sql = """
    SELECT m.id, m.title, m.release_year, avg_r.avg_rating,
        CASE WHEN wl.movie_id IS NOT NULL THEN true ELSE false END AS hasInList
    FROM Movie m
    LEFT JOIN (
        SELECT movie_id, AVG(rating) AS avg_rating
        FROM Rating
        GROUP BY movie_id
    ) avg_r ON m.id = avg_r.movie_id
    LEFT JOIN WatchList wl ON wl.movie_id = m.id AND wl.user_id = %s;
    """
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (userId,))
            movies = cursor.fetchall()
            
            if movies:
                print(f"{'ID':<5} {'개봉연도':<6} {'평균 평점':<8} {'스크랩 여부':<7} {'제목':<30}")
                print("="*100)
                
                # 영화 데이터 출력
                for movie in movies:
                    avg_rating = round(movie[3], 1) if movie[3] else '-'
                    has_in_list = 'Yes' if movie[4] else 'No'
                    print(f"{movie[0]:<5} {movie[2]:<10} {avg_rating:<12} {has_in_list:<12} {movie[1]:<30}")
            else:
                print("조회된 영화가 없습니다.")
    except pymysql.MySQLError as e:
        print(f"영화 조회 실패: {e}")

# 평점 등록 기능
def add_rating(connection, userId):
    try:
        # 영화 ID와 평점 입력 받기
        movie_id = input("평점을 등록할 영화 ID를 입력하세요: ")
        rating = input("영화에 대한 평점을 입력하세요 (1~5): ")

        # 입력된 평점이 유효한지 확인
        if not rating.isdigit() or not (1 <= int(rating) <= 5):
            print("평점은 1부터 5 사이의 숫자여야 합니다.")
            return

        # INSERT 쿼리 작성
        sql = """
        INSERT INTO Rating (rating, movie_id, user_id) 
        VALUES (%s, %s, %s)
        """
        
        with connection.cursor() as cursor:
            cursor.execute(sql, (rating, movie_id, userId))
            connection.commit()
            
        print("평점이 성공적으로 등록되었습니다.")
    
    except pymysql.MySQLError as e:
        print(f"평점 등록 실패: {e}")

# 평점 수정 기능
def update_rating(connection, userId):
    try:
        # 수정할 영화 ID와 새로운 평점 입력 받기
        movie_id = input("수정할 영화 ID를 입력하세요: ")
        rating = input("새로운 평점을 입력하세요 (1-5): ")

        # 입력된 평점이 유효한지 확인
        if not rating.isdigit() or not (1 <= int(rating) <= 5):
            print("평점은 1부터 5 사이의 숫자여야 합니다.")
            return
        
        # UPDATE 쿼리 작성
        sql = """
        UPDATE Rating 
        SET rating = %s 
        WHERE movie_id = %s AND user_id = %s
        """
        
        with connection.cursor() as cursor:
            cursor.execute(sql, (rating, movie_id, userId))
            connection.commit()
            
        print("평점이 성공적으로 수정되었습니다.")
    
    except pymysql.MySQLError as e:
        print(f"평점 수정 실패: {e}")


# 영화 스크랩 기능 (시청 목록에 추가)
def add_to_watchlist(connection, userId):
    try:
        # 영화 ID 입력 받기
        movie_id = input("스크랩할 영화 ID를 입력하세요: ")

        # INSERT 쿼리 작성
        sql = """
        INSERT INTO WatchList (movie_id, user_id) 
        VALUES (%s, %s)
        """
        
        with connection.cursor() as cursor:
            cursor.execute(sql, (movie_id, userId))
            connection.commit()
            
        print("영화가 스크랩 목록에 추가되었습니다.")
    
    except pymysql.MySQLError as e:
        print(f"스크랩 실패: {e}")

# 스크랩 삭제 기능
def remove_from_watchlist(connection, userId):
    try:
        # 영화 ID 입력 받기
        movie_id = input("삭제할 영화 ID를 입력하세요: ")

        # DELETE 쿼리 작성
        sql = """
        DELETE FROM WatchList 
        WHERE movie_id = %s AND user_id = %s
        """
        
        with connection.cursor() as cursor:
            cursor.execute(sql, (movie_id, userId))
            connection.commit()
            
        if cursor.rowcount == 0:
            print("스크랩 목록에 해당 영화가 없습니다.")
        else:
            print("영화가 스크랩 목록에서 삭제되었습니다.")
    
    except pymysql.MySQLError as e:
        print(f"스크랩 삭제 실패: {e}")



# 유저에게 메뉴를 보여주고 선택을 받는 함수
def display_menu(logged_in):
    print("\n=== 영화 평점 시스템 ===")
    
    if logged_in:
        # 로그인 후에는 모든 기능 제공
        print("1. 영화 전체 조회")
        print("2. 영화 평점 등록")
        print("3. 영화 평점 수정")
        print("4. 영화 스크랩")
        print("5. 스크랩한 영화 삭제")
        print("0. 로그아웃")
    else:
        # 로그인 전에는 회원가입과 로그인만 제공
        print("1. 회원가입")
        print("2. 로그인")
        print("0. 종료")
    
    choice = input("번호를 입력하세요: ")
    return choice

def handle_menu_choice(choice, connection, logged_in, userId):
    """유저가 선택한 메뉴에 맞는 기능을 호출하는 함수"""
    if logged_in:
        if choice == '1':
            view_movies(connection, userId)
        elif choice == '2':
            add_rating(connection, userId)
        elif choice == '3':
            update_rating(connection, userId)
        elif choice == '4':
            add_to_watchlist(connection, userId)
        elif choice == '5':
            remove_from_watchlist(connection, userId)
        elif choice == '0':
            print("로그아웃이 완료되었습니다.")
            return False  # 로그아웃 시 logged_in 상태를 False로 변경
    else:
        if choice == '1':
            sign_up(connection)  # 회원가입 호출
        elif choice == '2':
            logged_in, userId = login(connection)  # 로그인 호출
        elif choice == '0':
            print("시스템을 종료합니다.")
            return False
        else:
            print("잘못된 입력입니다. 다시 선택해주세요.")
    
    return [logged_in, userId]  # 로그인 상태 반환

def main():
    # DB 연결
    connection = connect_to_db()
    if connection is None:
        print("데이터베이스 연결에 실패했습니다. 프로그램을 종료합니다.")
        return

    logged_in = False  # 로그인 상태 추적
    userId = '' # 유저 id
    
    # 메뉴를 계속해서 표시하고 선택을 받기
    while True:
        choice = display_menu(logged_in)
        logged_in, userId = handle_menu_choice(choice, connection, logged_in, userId)
        if not logged_in:
            break
    
    # DB 연결 종료
    connection.close()

if __name__ == '__main__':
    main()
