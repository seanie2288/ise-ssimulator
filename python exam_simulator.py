import time

def load_questions():
    # Sample questions - you can replace these with your own
    questions = [
        {
            "question": "What is the capital of France?",
            "choices": ["A) Berlin", "B) Paris", "C) Rome", "D) Madrid"],
            "answer": "B"
        },
        {
            "question": "Which planet is known as the Red Planet?",
            "choices": ["A) Earth", "B) Mars", "C) Jupiter", "D) Venus"],
            "answer": "B"
        },
        {
            "question": "What is 2 + 2?",
            "choices": ["A) 3", "B) 4", "C) 5", "D) 6"],
            "answer": "B"
        },
        # Add more questions here, up to 60
    ]
    return questions

def exam_simulator():
    questions = load_questions()
    max_questions = 60
    num_questions = min(len(questions), max_questions)
    print(f"Welcome to the Exam Simulator! You will be asked {num_questions} questions.")
    print("You have a total time limit of 5 minutes (300 seconds). Good luck!\n")
    
    start_time = time.time()
    time_limit = 300  # seconds
    
    score = 0
    
    for idx, q in enumerate(questions[:num_questions], 1):
        elapsed_time = time.time() - start_time
        remaining_time = time_limit - elapsed_time
        if remaining_time <= 0:
            print("\nTime's up!")
            break
        
        print(f"Question {idx}: {q['question']}")
        for choice in q['choices']:
            print(choice)
        print(f"Remaining time: {int(remaining_time)} seconds")
        
        user_answer = input("Your answer (A, B, C, D): ").strip().upper()
        if user_answer == q['answer']:
            print("Correct!\n")
            score += 1
        else:
            print(f"Incorrect! The correct answer was {q['answer']}.\n")
    
    print(f"Exam finished! Your score: {score} out of {num_questions}")

if __name__ == "__main__":
    exam_simulator()
